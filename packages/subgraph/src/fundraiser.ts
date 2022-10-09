import { BigInt, ipfs, Address, json } from "@graphprotocol/graph-ts"
import {
  Fundraiser,
  AccountCreated,
  AccountUpdated,
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
    account.kind = event.params.kind;
    account.timestamp = event.params.timestamp;
    account.verificationState = 0;
    account.totalCampaigns = integer.ZERO;
    account.totalDonations = BigInt.zero();
    account.dataCID = event.params.accountDataCID;

    let metadata = ipfs.cat(event.params.accountDataCID + "/data.json");
    if (metadata) {
      const file = json.fromBytes(metadata).toObject();
      if (file) {
        const firstName = file.get("firstName");
        const lastName = file.get("lastName");
        const organization = file.get("organization");
        const email = file.get("email");
        const profilePicUrl = file.get("image");

        if (firstName) {
          account.firstName = firstName.toString();
        }

        if (lastName) {
          account.lastName = lastName.toString();
        }

        if (organization) {
          account.organization = organization.toString();
        }

        if (email) {
          account.email = email.toString();
        }

        if (profilePicUrl) {
          const imageURL =
            "https://ipfs.io/ipfs/" + event.params.accountDataCID + '/' + profilePicUrl.toString();
          account.profilePicURL = imageURL;
        }
      }
    }
    account.save();
  }
}

export function handleAccountUpdated(event: AccountUpdated): void {
  let account = Account.load(event.params.accountId.toHex())

  if (account !== null) {
    account.dataCID = event.params.dataCID;
    account.kind = event.params.kind;

    let metadata = ipfs.cat(event.params.dataCID + "/data.json");

    if (metadata) {
      const file = json.fromBytes(metadata).toObject();
      if (file) {
        const firstName = file.get("firstName");
        const lastName = file.get("lastName");
        const organization = file.get("organization");
        const email = file.get("email");
        const profilePicUrl = file.get("image");

        if (firstName) {
          account.firstName = firstName.toString();
        }

        if (lastName) {
          account.lastName = lastName.toString();
        }

        if (organization) {
          account.organization = organization.toString();
        }

        if (email) {
          account.email = email.toString();
        }

        if (profilePicUrl) {
          const imageURL =
            "https://ipfs.io/ipfs/" + event.params.dataCID + '/' + profilePicUrl.toString();
          account.profilePicURL = imageURL;
        }
      }
    }
    account.save()
  }
}

export function handleCampaignCategoryCreated(
  event: CampaignCategoryCreated
): void {
  let category = CampaignCategory.load(event.params.categoryId.toHex())

  if (!category) {
    category = new CampaignCategory(event.params.categoryId.toHex());
    category.categoryId = event.params.categoryId;
    category.name = event.params.name.toString();
    category.save()
  }
}

export function handleCampaignCreated(event: CampaignCreated): void {
  let campaign = Campaign.load(event.params.campaign.id.toHex());
  let account = Account.load(event.params.campaign.account.id.toHex());
  let category = CampaignCategory.load(event.params.campaign.categoryId.toHex());

  if (!campaign && category !== null && account !== null) {
    campaign = new Campaign(event.params.campaign.id.toHex());
    campaign.campaignId = event.params.campaign.id;
    campaign.dataCID = event.params.campaign.dataCID;
    campaign.account = account.id;
    campaign.kind = event.params.campaign.kind;
    campaign.category = category.id;
    campaign.goal = event.params.campaign.goal;
    campaign.donated = integer.ZERO;
    campaign.totalDonations = integer.ZERO;
    campaign.amountPaid = integer.ZERO;
    campaign.state = event.params.campaign.state;
    campaign.createdAt = event.params.createdAt;
    campaign.startAt = event.params.campaign.startAt;
    campaign.endAt = event.params.campaign.endAt;
    account.totalCampaigns = integer.increment(account.totalCampaigns);
    account.save()

    let metadata = ipfs.cat(event.params.campaign.dataCID + "/data.json");

    if (metadata) {
      const file = json.fromBytes(metadata).toObject();
      if (file) {
        const name = file.get("name");
        const description = file.get("description");
        const imageURL = file.get("image");
        const videoURL = file.get("video");

        if (name) {
          campaign.name = name.toString();
        }

        if (description) {
          campaign.description = description.toString();
        }

        if (imageURL) {
          const url =
            "https://ipfs.io/ipfs/" + event.params.campaign.dataCID + '/' + imageURL.toString();
          campaign.imageURL = url;
        }

        if (videoURL) {
          const vUrl =
            "https://ipfs.io/ipfs/" + event.params.campaign.dataCID + '/' + videoURL.toString();
          campaign.videoURL = vUrl;
        }
      }
    }
    campaign.save();
  }
}

export function handleCampaignClosed(event: CampaignClosed): void { }

export function handleCampaignPublished(event: CampaignPublished): void { }

export function handleCampaignUpdated(event: CampaignUpdated): void { }

export function handleDistributedFunds(event: DistributedFunds): void { }

export function handleDonationMade(event: DonationMade): void { }

export function handlePaused(event: Paused): void { }

export function handleRoleAdminChanged(event: RoleAdminChanged): void { }

export function handleRoleGranted(event: RoleGranted): void { }

export function handleRoleRevoked(event: RoleRevoked): void { }

export function handleUnpaused(event: Unpaused): void {
  // Entity fields can be set using simple assignments
  //entity.count = BigInt.fromI32(0)
  // BigInt and BigDecimal math are supported
  //entity.count = entity.count + BigInt.fromI32(1)
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
