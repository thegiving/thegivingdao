import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
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

export function createAccountCreatedEvent(
  accountId: Bytes,
  accountDataCID: string,
  owner: Address,
  timestamp: BigInt
): AccountCreated {
  let accountCreatedEvent = changetype<AccountCreated>(newMockEvent())

  accountCreatedEvent.parameters = new Array()

  accountCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "accountId",
      ethereum.Value.fromFixedBytes(accountId)
    )
  )
  accountCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "accountDataCID",
      ethereum.Value.fromString(accountDataCID)
    )
  )
  accountCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  accountCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return accountCreatedEvent
}

export function createCampaignCategoryCreatedEvent(
  categoryId: Bytes,
  name: string,
  caller: Address
): CampaignCategoryCreated {
  let campaignCategoryCreatedEvent = changetype<CampaignCategoryCreated>(
    newMockEvent()
  )

  campaignCategoryCreatedEvent.parameters = new Array()

  campaignCategoryCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "categoryId",
      ethereum.Value.fromFixedBytes(categoryId)
    )
  )
  campaignCategoryCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  campaignCategoryCreatedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )

  return campaignCategoryCreatedEvent
}

export function createCampaignClosedEvent(
  campaignId: Bytes,
  caller: Address,
  timestamp: BigInt
): CampaignClosed {
  let campaignClosedEvent = changetype<CampaignClosed>(newMockEvent())

  campaignClosedEvent.parameters = new Array()

  campaignClosedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromFixedBytes(campaignId)
    )
  )
  campaignClosedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  campaignClosedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return campaignClosedEvent
}

export function createCampaignCreatedEvent(
  campaign: ethereum.Tuple,
  createdAt: BigInt
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("campaign", ethereum.Value.fromTuple(campaign))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "createdAt",
      ethereum.Value.fromUnsignedBigInt(createdAt)
    )
  )

  return campaignCreatedEvent
}

export function createCampaignPublishedEvent(
  campaignId: Bytes,
  state: i32,
  caller: Address,
  timestamp: BigInt
): CampaignPublished {
  let campaignPublishedEvent = changetype<CampaignPublished>(newMockEvent())

  campaignPublishedEvent.parameters = new Array()

  campaignPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromFixedBytes(campaignId)
    )
  )
  campaignPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )
  campaignPublishedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  campaignPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return campaignPublishedEvent
}

export function createCampaignUpdatedEvent(
  campaign: ethereum.Tuple,
  updatedAt: BigInt
): CampaignUpdated {
  let campaignUpdatedEvent = changetype<CampaignUpdated>(newMockEvent())

  campaignUpdatedEvent.parameters = new Array()

  campaignUpdatedEvent.parameters.push(
    new ethereum.EventParam("campaign", ethereum.Value.fromTuple(campaign))
  )
  campaignUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedAt",
      ethereum.Value.fromUnsignedBigInt(updatedAt)
    )
  )

  return campaignUpdatedEvent
}

export function createDistributedFundsEvent(
  campaignId: Bytes,
  amount: BigInt,
  caller: Address,
  timestamp: BigInt
): DistributedFunds {
  let distributedFundsEvent = changetype<DistributedFunds>(newMockEvent())

  distributedFundsEvent.parameters = new Array()

  distributedFundsEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromFixedBytes(campaignId)
    )
  )
  distributedFundsEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  distributedFundsEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  distributedFundsEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return distributedFundsEvent
}

export function createDonationMadeEvent(
  amount: BigInt,
  timestamp: BigInt,
  caller: Address
): DonationMade {
  let donationMadeEvent = changetype<DonationMade>(newMockEvent())

  donationMadeEvent.parameters = new Array()

  donationMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  donationMadeEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  donationMadeEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )

  return donationMadeEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
