// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Campaign extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Campaign entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Campaign must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Campaign", id.toString(), this);
    }
  }

  static load(id: string): Campaign | null {
    return changetype<Campaign | null>(store.get("Campaign", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaignId(): Bytes {
    let value = this.get("campaignId");
    return value!.toBytes();
  }

  set campaignId(value: Bytes) {
    this.set("campaignId", Value.fromBytes(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get kind(): i32 {
    let value = this.get("kind");
    return value!.toI32();
  }

  set kind(value: i32) {
    this.set("kind", Value.fromI32(value));
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get goal(): BigInt {
    let value = this.get("goal");
    return value!.toBigInt();
  }

  set goal(value: BigInt) {
    this.set("goal", Value.fromBigInt(value));
  }

  get donated(): BigInt {
    let value = this.get("donated");
    return value!.toBigInt();
  }

  set donated(value: BigInt) {
    this.set("donated", Value.fromBigInt(value));
  }

  get donations(): Array<string> | null {
    let value = this.get("donations");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set donations(value: Array<string> | null) {
    if (!value) {
      this.unset("donations");
    } else {
      this.set("donations", Value.fromStringArray(<Array<string>>value));
    }
  }

  get totalDonations(): BigInt {
    let value = this.get("totalDonations");
    return value!.toBigInt();
  }

  set totalDonations(value: BigInt) {
    this.set("totalDonations", Value.fromBigInt(value));
  }

  get amountPaid(): BigInt {
    let value = this.get("amountPaid");
    return value!.toBigInt();
  }

  set amountPaid(value: BigInt) {
    this.set("amountPaid", Value.fromBigInt(value));
  }

  get state(): i32 {
    let value = this.get("state");
    return value!.toI32();
  }

  set state(value: i32) {
    this.set("state", Value.fromI32(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get startAt(): BigInt {
    let value = this.get("startAt");
    return value!.toBigInt();
  }

  set startAt(value: BigInt) {
    this.set("startAt", Value.fromBigInt(value));
  }

  get endAt(): BigInt | null {
    let value = this.get("endAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set endAt(value: BigInt | null) {
    if (!value) {
      this.unset("endAt");
    } else {
      this.set("endAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get imageURL(): string | null {
    let value = this.get("imageURL");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set imageURL(value: string | null) {
    if (!value) {
      this.unset("imageURL");
    } else {
      this.set("imageURL", Value.fromString(<string>value));
    }
  }

  get videoURL(): string | null {
    let value = this.get("videoURL");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set videoURL(value: string | null) {
    if (!value) {
      this.unset("videoURL");
    } else {
      this.set("videoURL", Value.fromString(<string>value));
    }
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get accountId(): Bytes {
    let value = this.get("accountId");
    return value!.toBytes();
  }

  set accountId(value: Bytes) {
    this.set("accountId", Value.fromBytes(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get kind(): i32 {
    let value = this.get("kind");
    return value!.toI32();
  }

  set kind(value: i32) {
    this.set("kind", Value.fromI32(value));
  }

  get dataCID(): string {
    let value = this.get("dataCID");
    return value!.toString();
  }

  set dataCID(value: string) {
    this.set("dataCID", Value.fromString(value));
  }

  get verificationState(): i32 {
    let value = this.get("verificationState");
    return value!.toI32();
  }

  set verificationState(value: i32) {
    this.set("verificationState", Value.fromI32(value));
  }

  get campaigns(): Array<string> | null {
    let value = this.get("campaigns");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set campaigns(value: Array<string> | null) {
    if (!value) {
      this.unset("campaigns");
    } else {
      this.set("campaigns", Value.fromStringArray(<Array<string>>value));
    }
  }

  get donations(): Array<string> | null {
    let value = this.get("donations");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set donations(value: Array<string> | null) {
    if (!value) {
      this.unset("donations");
    } else {
      this.set("donations", Value.fromStringArray(<Array<string>>value));
    }
  }

  get payouts(): Array<string> | null {
    let value = this.get("payouts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set payouts(value: Array<string> | null) {
    if (!value) {
      this.unset("payouts");
    } else {
      this.set("payouts", Value.fromStringArray(<Array<string>>value));
    }
  }

  get totalCampaigns(): BigInt {
    let value = this.get("totalCampaigns");
    return value!.toBigInt();
  }

  set totalCampaigns(value: BigInt) {
    this.set("totalCampaigns", Value.fromBigInt(value));
  }

  get totalDonations(): BigInt {
    let value = this.get("totalDonations");
    return value!.toBigInt();
  }

  set totalDonations(value: BigInt) {
    this.set("totalDonations", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get firstName(): string | null {
    let value = this.get("firstName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set firstName(value: string | null) {
    if (!value) {
      this.unset("firstName");
    } else {
      this.set("firstName", Value.fromString(<string>value));
    }
  }

  get lastName(): string | null {
    let value = this.get("lastName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastName(value: string | null) {
    if (!value) {
      this.unset("lastName");
    } else {
      this.set("lastName", Value.fromString(<string>value));
    }
  }

  get organization(): string | null {
    let value = this.get("organization");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set organization(value: string | null) {
    if (!value) {
      this.unset("organization");
    } else {
      this.set("organization", Value.fromString(<string>value));
    }
  }

  get email(): string | null {
    let value = this.get("email");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set email(value: string | null) {
    if (!value) {
      this.unset("email");
    } else {
      this.set("email", Value.fromString(<string>value));
    }
  }

  get profilePicURL(): string | null {
    let value = this.get("profilePicURL");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set profilePicURL(value: string | null) {
    if (!value) {
      this.unset("profilePicURL");
    } else {
      this.set("profilePicURL", Value.fromString(<string>value));
    }
  }
}

export class Donation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Donation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Donation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Donation", id.toString(), this);
    }
  }

  static load(id: string): Donation | null {
    return changetype<Donation | null>(store.get("Donation", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaign(): string {
    let value = this.get("campaign");
    return value!.toString();
  }

  set campaign(value: string) {
    this.set("campaign", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get sender(): string {
    let value = this.get("sender");
    return value!.toString();
  }

  set sender(value: string) {
    this.set("sender", Value.fromString(value));
  }
}

export class Distribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Distribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Distribution must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Distribution", id.toString(), this);
    }
  }

  static load(id: string): Distribution | null {
    return changetype<Distribution | null>(store.get("Distribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaign(): string {
    let value = this.get("campaign");
    return value!.toString();
  }

  set campaign(value: string) {
    this.set("campaign", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get receiver(): string {
    let value = this.get("receiver");
    return value!.toString();
  }

  set receiver(value: string) {
    this.set("receiver", Value.fromString(value));
  }
}

export class CampaignCategory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignCategory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignCategory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignCategory", id.toString(), this);
    }
  }

  static load(id: string): CampaignCategory | null {
    return changetype<CampaignCategory | null>(
      store.get("CampaignCategory", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get categoryId(): Bytes {
    let value = this.get("categoryId");
    return value!.toBytes();
  }

  set categoryId(value: Bytes) {
    this.set("categoryId", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }
}
