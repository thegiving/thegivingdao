import { getIPFSData } from '../../utils/getIPFSData';
import { TCampaign } from './campaign';

export type TAccount = {
  id: string
  dataCID: string
  owner: string
  kind: number
  verificationState: number
  campaigns: Partial<TCampaign>[]
  createdAt: number
  totalCampaigns?: number
  totalDonations?: number
  firstName?: string
  lastName?: string
  organization?: string
  email?: string
  profilePicURL?: string
}

export type TMetadata = Pick<TAccount, 'firstName' | 'lastName' | 'organization' | 'email' | 'profilePicURL'>;

export class Account {
  private props: TAccount;
  private metadata: TMetadata;

  constructor(attributes: TAccount) {
    this.props = attributes;
  }

  get id(): string {
    return this.props.id;
  }

  get owner(): string {
    return this.props.owner;
  }

  get kind(): number {
    return this.props.kind;
  }

  get verificationState(): number {
    return this.props.verificationState;
  }

  get dataCID(): string {
    return this.props.dataCID;
  }

  get campaigns(): Partial<TCampaign>[] {
    return this.props.campaigns;
  }

  get totalCampaigns(): number {
    return this.props.totalCampaigns;
  }

  get totalDonations(): number {
    return this.props.totalDonations;
  }

  get profilePicURL(): string {
    return this.props.profilePicURL
  }

  get createdAt(): number {
    return this.props.createdAt;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email;
  }

  get organization(): string {
    return this.props.organization;
  }


  public async serialize() {
    let _json = {};
    for (const prop in this.props) {
      if (prop === "__typename") {
        continue
      }
      _json[prop] = this.props[prop];
    }

    if (_json["firstName"] === null
      || _json["lastName"] === null
      || _json["organization"] === null
      || _json["email"] === null
      || _json["profilePicURL"] === null) {
      await this.setMetadata();

      _json["firstName"] = this.metadata.firstName;
      _json["lastName"] = this.metadata.lastName;
      _json["organization"] = this.metadata.organization;
      _json["email"] = this.metadata.email;
      _json["profilePicURL"] = this.metadata.profilePicURL;
    }

    return _json;
  }

  private async setMetadata() {
    try {
      const response = await getIPFSData(this.props.dataCID);
      if (!response) {
        return
      }
      const { image, firstName, lastName, organization, email } = response.file;
      this.metadata = { profilePicURL: image, firstName, lastName, organization, email } as TMetadata;
    } catch (e) {
      console.error(e)
    }
  }
}
