import { BaseDTO } from "../database/baseDTO";
import { NFTData } from "./NFT.model";

export default class NFTDTO extends BaseDTO implements NFTData {
  public token_id: string;
  public name: string;
  public description: string;
  public image_url: string;
  public creator_address: string;
  public Owner: string;

  constructor(body: NFTData) {
    super();
    this.token_id = body.token_id;
    this.name = body.name;
    this.description = body.description;
    this.image_url = body.image_url;
    this.creator_address = body.creator_address;
    this.Owner = body.Owner;
    this.createDTO(this);
  }
}
