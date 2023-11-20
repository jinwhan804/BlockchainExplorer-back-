import NFTDTO from "./NFT.dto";
import db from "../database";
import { NFTData } from "./NFT.model";
import { NextFunction } from "express";

const createNFT = async (data: NFTDTO, next : NextFunction) => {
  try {
    await db.models.NFT.create({
      token_id : data.token_id,
      name : data.name,
      description : data.description,
      image_url : data.image_url,
      creator_address : data.creator_address,
      Owner : data.Owner,
    });
  } catch (error) {
    next(error);
  }
};

const viewAllNFTs = async (next : NextFunction) => {
  try {
    const nfts = await db.models.NFT.findAll();

    return nfts;
  } catch (error) {
    next(error);
  }
}

const viewOneNFT = async (id : number, next : NextFunction) => {
  try {
    const nft = await db.models.NFT.findOne({where : {id}});

    return nft;
  } catch (error) {
    next(error);
  }
}

const createNFTTest = async (data: NFTData) => {
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

export default { createNFT, createNFTTest, isExist, viewAllNFTs, viewOneNFT };
