//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import 'hardhat/console.sol';

contract Fundraiser is AccessControlEnumerable, Pausable {
  using SafeMath for uint256;
  bytes32 public constant PAUSER_ROLE = keccak256('PAUSER_ROLE');
  bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');

  enum VerificationState {
    NotVerified,
    Verified,
    InReview,
    NotApplicable
  }

  enum CampaignState {
    Active,
    Draft,
    Refunding,
    Closed,
    Voting
  }

  enum CampaignKind {
    Governance,
    NoGovernance,
    OptionalGovernance
  }

  enum AccountKind {
    Individual,
    Charity,
    NonProfitCharity,
    NonProfit
  }

  struct Campaign {
    bytes32 id;
    Account account;
    string dataCID;
    CampaignKind kind;
    bytes32 categoryId;
    uint256 startAt;
    uint256 endAt;
    uint256 goal;
    uint256 donated;
    uint256 paid;
    uint256 numDonations;
    CampaignState state;
  }

  struct Account {
    bytes32 id;
    address owner;
    string dataCID;
    AccountKind kind;
    VerificationState verification;
  }

  struct Donation {
    uint256 amount;
    uint256 timestamp;
    address sender;
  }

  struct CampaignCategory {
    bytes32 id;
    string name;
  }

  struct Stats {
    uint256 totalAccounts;
    uint256 totalCampaigns;
    uint256 totalDonations;
    uint256 totalDonated;
  }

  mapping(bytes32 => Campaign) public campaigns; // make private for gas efficiency
  mapping(address => Account) public accounts;
  mapping(bytes32 => Campaign[]) public campaignsByAccount; // make private for gas efficiency
  mapping(bytes32 => string) public campaignCategories;
  mapping(bytes32 => Donation[]) public donationsByCampaign; // make private for gas efficiency

  Stats private _stats;
  bytes32[] private _campaignCategoryIds;
  string[] private _defaultCampaignCategories = [
    'Environment',
    'Animals',
    'Emergencies',
    'Family',
    'Business',
    'Events',
    'Community',
    'Education',
    'Memorials',
    'Medical',
    'Bills',
    'Travel',
    'Sports',
    'Volunteer',
    'Other'
  ];

  modifier pauserOnly() {
    require(hasRole(PAUSER_ROLE, _msgSender()), "PAUSER_UNAUTHORIZED");
    _;
  }

  modifier adminOnly() {
    require(hasRole(ADMIN_ROLE, _msgSender()), "ADMIN_UNAUTHORIZED");
    _;
  }

  modifier campaignManagerOnly() {
    Account storage account = accounts[_msgSender()];
    require(account.owner == _msgSender() || hasRole(ADMIN_ROLE, _msgSender()), "UNAUTHORIZED");
    _;
  }

  modifier accountOwnerOnly() {
    Account storage account = accounts[_msgSender()];
    require(account.owner == _msgSender(), "SENDER_UNAUTHORIZED");
    _;
  }

  event CampaignCreated(Campaign campaign, uint256 createdAt);
  event CampaignUpdated(Campaign campaign, uint256 updatedAt);
  event AccountCreated(bytes32 indexed accountId, string accountDataCID, address indexed owner, uint256 timestamp);
  event CampaignCategoryCreated(bytes32 indexed categoryId, string indexed name, address indexed caller);
  event DonationMade(bytes32 indexed campaignId, uint256 amount, address indexed caller, uint256 timestamp);
  event DistributedFunds(bytes32 indexed campaignId, uint256 amount, address indexed caller, uint256 timestamp);
  event CampaignClosed(bytes32 indexed campaignId, address indexed caller, uint256 timestamp);
  event CampaignPublished(bytes32 indexed campaignId, CampaignState state, address indexed caller, uint256 timestamp);

  constructor() {
    _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
    _setupRole(ADMIN_ROLE, _msgSender());
    _setupRole(PAUSER_ROLE, _msgSender());
    _setDefaultCampaignCategories();
  }

  function _setDefaultCampaignCategories() internal {
    setCampaignCategories(_defaultCampaignCategories);
  }

  function setCampaignCategories(string[] memory categories) public adminOnly {
    require(categories.length > 0, 'NO_CATEGORIES');
    for (uint256 i = 0; i < categories.length; i++) {
      bytes32 _categoryId = keccak256(abi.encodePacked(categories[i]));
      _setCampaignCategory(_categoryId, categories[i]);
    }
  }

  function _setCampaignCategory(bytes32 categoryId, string memory name) internal {
    if (!_campaignCategoryExists(categoryId)) {
      _campaignCategoryIds.push(categoryId);
      campaignCategories[categoryId] = name;

      emit CampaignCategoryCreated(categoryId, name, _msgSender());
    }
  }

  function _campaignCategoryExists(bytes32 categoryId) internal view returns (bool) {
    return bytes(campaignCategories[categoryId]).length > 0;
  }

  function getCampaignCategories() external view adminOnly returns (bytes32[] memory categoryIds) {
    categoryIds = _campaignCategoryIds;
  }

  function _validateCampaign(
    bytes32 categoryId,
    uint256 goal,
    uint256 startAt,
    uint256 endAt,
    Account storage account,
    CampaignKind kind
  ) internal view {
    require(bytes(campaignCategories[categoryId]).length > 0, "CATEGORY_EMPTY");
    require(goal > 0, "ZERO_GOAL_AMOUNT");
    require(startAt > 0, "ZERO_START_DATE");
    require(uint8(kind) <= 2, "INVALID_CAMPAIGN_KIND");

    if (endAt != 0) {
      require(endAt > startAt, "End date must be greater than start date");
    }
    if (account.kind == AccountKind.Charity && account.verification != VerificationState.Verified) {
      require(
        kind == CampaignKind.Governance,
        "Unverified charities must use campaign governance model"
      );
    }
  }

  function createCampaign(
    string calldata dataCID,
    CampaignKind kind,
    bytes32 categoryId,
    uint256 startAt,
    uint256 endAt,
    uint256 goal
  ) external returns (bytes32) {
    Account storage account = accounts[_msgSender()];
    require(account.owner != address(0), "ACCOUNT_NOT_FOUND");
    _validateCampaign(categoryId, goal, startAt, endAt, account, kind);

    bytes32 campaignId = keccak256(
      abi.encodePacked(_msgSender(), address(this), startAt, dataCID)
    );
    require(campaigns[campaignId].startAt == 0, "ALREADY_EXISTS");

    Campaign memory campaign = Campaign(
      campaignId,
      account,
      dataCID,
      kind,
      categoryId,
      startAt,
      endAt,
      goal,
      0,
      0,
      0,
      CampaignState.Draft
    );
    campaigns[campaignId] = campaign;
    campaignsByAccount[account.id].push(campaign);
    _stats.totalCampaigns = _stats.totalCampaigns.add(1);

    emit CampaignCreated(campaign, block.timestamp);

    return campaignId;
  }

  function updateCampaign(
    bytes32 campaignId,
    uint256 startAt,
    uint256 endAt,
    string calldata dataCID,
    uint256 goal,
    CampaignKind kind,
    bytes32 categoryId
  ) external accountOwnerOnly {
    Campaign storage campaign = campaigns[campaignId];
    require(campaigns[campaignId].id != 0, "CAMPAIGN_NOT_FOUND");
    Account storage account = accounts[_msgSender()];
    require(
      account.owner != address(0) && campaign.account.owner == account.owner,
      'ACCOUNT_NOT_FOUND'
    );
    require(block.timestamp < campaign.startAt, "CAMPAIGN_STARTED");
    _validateCampaign(categoryId, goal, startAt, endAt, account, kind);

    campaign.startAt = startAt;
    campaign.endAt = endAt;
    campaign.dataCID = dataCID;
    campaign.goal = goal;
    campaign.kind = kind;
    campaign.categoryId = categoryId;

    emit CampaignUpdated(campaign, block.timestamp);
  }

  function donate(bytes32 campaignId) public payable {
    require(msg.value > 0 ether, "ZERO_AMOUNT");
    require(campaigns[campaignId].id != 0, "CAMPAIGN_NOT_FOUND");
    require(campaigns[campaignId].state == CampaignState.Active, "CAMPAIGN_NOT_ACTIVE");

    Campaign storage campaign = campaigns[campaignId];
    
    campaign.donated = campaign.donated.add(msg.value);
    campaign.numDonations = campaign.numDonations.add(1);

    donationsByCampaign[campaignId].push(
      Donation(msg.value, block.timestamp, _msgSender())
    );

    emit DonationMade(campaignId, msg.value, _msgSender(), block.timestamp);
    _stats.totalDonated = _stats.totalDonated.add(msg.value);
    _stats.totalDonations  = _stats.totalDonations.add(1);
  }

  function distributeFunds(bytes32 campaignId, uint256 amount) accountOwnerOnly public {
    require(amount > 0 ether, "ZERO_AMOUNT");
    Campaign storage campaign = campaigns[campaignId];
    require(campaign.donated > 0, "NO_DONATIONS_MADE");
    uint256 leftToDistribute = campaign.donated.sub(campaign.paid);
    require(leftToDistribute > 0, "DONATIONS_FULLY_PAID");

    // if they are trying to take out more than what is left, just give what is left
    if (amount > leftToDistribute) {
      amount = leftToDistribute;
    }

    campaign.paid = campaign.paid.add(amount);
    (bool success, ) = payable(_msgSender()).call{value: amount}("");
    if (!success) {
      campaign.paid = campaign.paid.sub(amount);
    }

    require(success, "DISTRIBUTION_FAILURE");
    emit DistributedFunds(campaignId, amount, _msgSender(), block.timestamp);
  }

  function createAccount(string calldata dataCID, AccountKind kind) public {
    require(uint8(kind) <= 3, "INVALID_ACCOUNT_KIND");
    bytes32 accountId = keccak256(
      abi.encodePacked(_msgSender(), address(this), kind, dataCID, block.timestamp)
    );
    require(accounts[_msgSender()].owner == address(0), "ALREADY_EXISTS");
    Account memory account = Account(
      accountId,
      _msgSender(),
      dataCID,
      kind,
      VerificationState.NotVerified
    );
    accounts[_msgSender()] = account;
    _stats.totalAccounts = _stats.totalAccounts.add(1);
    emit AccountCreated(accountId, dataCID, _msgSender(), block.timestamp);
  }

  function getCampaignKindByValue(CampaignKind _kind) external pure returns (string memory) {
    require(uint8(_kind) <= 2, "INVALID_CAMPAIGN_KIND");
    if (CampaignKind.Governance == _kind) return "Governance";
    if (CampaignKind.NoGovernance == _kind) return "No Governance";
    if (CampaignKind.OptionalGovernance == _kind) return "Optional Governance";
    return "INVALID_TYPE";
  }

  function getAccountKindByValue(AccountKind _kind) external pure returns (string memory) {
    require(uint8(_kind) <= 3, "INVALID_ACCOUNT_KIND");
    if (AccountKind.Individual == _kind) return "Individual";
    if (AccountKind.Charity == _kind) return "Charity";
    if (AccountKind.NonProfit == _kind) return "Non-Profit";
    if (AccountKind.NonProfitCharity == _kind) return "Non-Profit Charity";
    return "INVALID_TYPE";
  }

  function closeCampaign(bytes32 campaignId) external campaignManagerOnly {
    Campaign storage campaign = campaigns[campaignId];
    require(campaign.state == CampaignState.Active || campaign.state == CampaignState.Draft, "UNABLE_TO_CLOSE");

    campaign.state = CampaignState.Closed;
    emit CampaignClosed(campaignId, _msgSender(), block.timestamp);
  } 

  function publishCampaign(bytes32 campaignId) external campaignManagerOnly {
    Campaign storage campaign = campaigns[campaignId];
    require(campaign.state == CampaignState.Draft || campaign.state == CampaignState.Closed, "UNABLE_TO_PUBLISH");

    campaign.state = CampaignState.Active;
    emit CampaignPublished(campaignId,  campaign.state, _msgSender(), block.timestamp);
  }

  function pause() public virtual pauserOnly {
    _pause();
  }

  function unpause() public virtual pauserOnly {
    _unpause();
  }
}
