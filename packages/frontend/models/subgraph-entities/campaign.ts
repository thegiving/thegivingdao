import { TAccount, Account } from "./account"
import { getIPFSData } from '../../utils/getIPFSData';

export type TCampaign = {
  id: string
  dataCID: string
  account?: Partial<TAccount>
  kind?: number
  category?: TCampaignCategory
  name?: string
  description?: string
  goal?: number
  donated?: number
  amountPaid?: number
  totalDonations?: number
  createdAt?: number
  startAt?: number
  endAt?: number
  imageURL?: string
}

export type TMetadata = Pick<TCampaign,'name' | 'description' | 'imageURL'>;

export type TCampaignCategory = {
  id: string
  name: string
}

export class Campaign {
  private props: TCampaign;
  private metadata: TMetadata;

  constructor(attributes: TCampaign) {
    this.props = attributes;
  }

  get id(): string {
    return this.props.id;
  }

  get goal(): number {
    return this.props.goal;
  }

  get donated(): number {
    return this.props.donated;
  }

  get endAt(): number {
    return this.props.endAt;
  }

  get name() {
    return this.props.name || this.metadata.name;
  }

  get description(): string {
    return this.props.description || this.metadata.description;
  }

  get imageURL(): string {
    return this.props.imageURL || this.metadata.imageURL;
  }

  public async serialize() {
    let _json = {};
    for (const prop in this.props) {
      if (prop === "__typename") {
        continue
      }
      _json[prop] = this.props[prop];
    }

    if (_json["name"] === null || _json["imageURL"] === null || _json["description"] === null) {
      await this.setMetadata();
      _json["name"] = this.metadata.name;
      _json["description"] = this.metadata.description;
      _json["imageURL"] = this.metadata.imageURL;
    }

    if (_json["account"]) {
      const account = new Account(_json["account"]);
      const _account = await account.serialize();
      _json["account"] = _account;
    }

    return _json;
  }

  private async setMetadata() {
    try {
      const response = await getIPFSData(this.props.dataCID);
      if (!response) {
        return
      }
      const {image, name, description} = response.file;
      this.metadata = {imageURL: image, name, description} as TMetadata;
    } catch (e) {
      console.error(e)
    }
  }
}
