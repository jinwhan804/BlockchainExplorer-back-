import NFTDTO from "./NFT.dto";
import db from "../database";
import { NFT, NFTData } from "./NFT.model";
import { Tx } from "../Tx/Tx.model";
import { Sequelize } from "sequelize-typescript";

const createNFT = async (data: NFTDTO) => {
  try {
    const { token_id, name, description, image_url, creator_address, Owner } =
      data;

    await db.models.NFT.create({
      token_id,
      name,
      description,
      image_url,
      creator_address,
      Owner,
    });
  } catch (error) {
    console.log("NFT 서비스에서 NFT 데이터 추가하다 에러남");
    console.log(error);
  }
};

const createNFTTest = async (data: NFTData, txData: any) => {
  try {
    const {
      token_id,
      name,
      description,
      image_url,
      creator_address,
      Owner,
      num,
    } = data;

    const result = await db.models.NFT.create({
      token_id,
      name,
      description,
      image_url,
      creator_address,
      Owner,
    });
    await db.models.Tx.update(
      { nft_id: result.dataValues.id },
      { where: { id: txData.id } }
    );
  } catch (error) {
    console.log("NFT 서비스에서 NFT 데이터 추가하다 에러남");
    console.log(error);
  }
};
const NFTtabledestroy = async () => {
  await db.models.NFT.destroy({
    where: {},
    truncate: true,
  });
};
const isExist = async (token_id: number) => {
  try {
    const result = await db.models.NFT.findOne({
      where: {
        token_id: token_id,
      },
    });
    return result !== undefined && result !== null ? true : false;
  } catch (error) {
    console.log("isExist", error);
  }
};

export default { createNFT, createNFTTest, isExist, NFTtabledestroy };
