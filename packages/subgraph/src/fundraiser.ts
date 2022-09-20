import { BigInt, ipfs, Address, json } from "@graphprotocol/graph-ts"
import {
  Fundraiser,
  AccountCreated,
  CampaignCategoryCreated,
  CampaignClosed,
  CampaignCreated,
  CampaignPublished,
  CampaignUpdated,
  DistributedFunds,
  DonationMade,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused
} from "../generated/Fundraiser/Fundraiser"
import { Campaign, Account, Donation, Distribution, CampaignCategory } from "../generated/schema"
import { integer } from "@protofire/subgraph-toolkit";

export function handleAccountCreated(event: AccountCreated): void {
  let account = Account.load(event.params.accountId.toHex())

  if (!account) {
    account = new Account(event.params.accountId.toHex());
    account.accountId = event.params.accountId;
    account.owner = event.params.owner;
    account.kind = event.params.kind.toString();
    account.timestamp = event.params.timestamp;
    account.verificationState = "NotVerified";
    account.totalCampaigns = integer.ZERO;
    account.totalDonations = BigInt.zero();

    let metadata = ipfs.cat(event.params.accountDataCID + "/data.json");

    if (metadata) {
      const file = json.fromBytes(metadata).toObject();

      if (file) {
        account.firstName = file.get("firstName")!.toString();
        account.lastName = file.get("lastName")!.toString();
        account.organization = file.get("organization")!.toString();
        account.email = file.get("email")!.toString();
      }
    }
    account.save();

    // Entity fields can be set using simple assignments
    //entity.count = BigInt.fromI32(0)
    // BigInt and BigDecimal math are supported
    //entity.count = entity.count + BigInt.fromI32(1)
  }


  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ADMIN_ROLE(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.PAUSER_ROLE(...)
  // - contract.accounts(...)
  // - contract.campaignCategories(...)
  // - contract.campaigns(...)
  // - contract.campaignsByAccount(...)
  // - contract.createCampaign(...)
  // - contract.donationsByCampaign(...)
  // - contract.getAccountKindByValue(...)
  // - contract.getCampaignCategories(...)
  // - contract.getCampaignKindByValue(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.hasRole(...)
  // - contract.paused(...)
  // - contract.supportsInterface(...)
}

export function handleCampaignCategoryCreated(
  event: CampaignCategoryCreated
): void {}

export function handleCampaignClosed(event: CampaignClosed): void {}

export function handleCampaignCreated(event: CampaignCreated): void {}

export function handleCampaignPublished(event: CampaignPublished): void {}

export function handleCampaignUpdated(event: CampaignUpdated): void {}

export function handleDistributedFunds(event: DistributedFunds): void {}

export function handleDonationMade(event: DonationMade): void {}

export function handlePaused(event: Paused): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleUnpaused(event: Unpaused): void {}
