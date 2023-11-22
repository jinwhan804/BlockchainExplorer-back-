import NFTDTO from "./NFT.dto";
import db from "../database";
import { NFT, NFTData } from "./NFT.model";
import { Tx } from "../Tx/Tx.model";
import { Sequelize } from "sequelize-typescript";
import { NextFunction } from "express";
import { Op } from "sequelize";

const createNFT = async (data: NFTDTO, next: NextFunction) => {
  try {
    await db.models.NFT.create({
      tokenId: data.tokenId,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      creatorAddress: data.creatorAddress,
      Owner: data.Owner,
    });
  } catch (error) {
    next(error);
  }
};

const viewAllNFTs = async (next: NextFunction) => {
  try {
    const nfts = await db.models.NFT.findAll();

    return nfts;
  } catch (error) {
    next(error);
  }
};

const viewOneNFT = async (id: number, next: NextFunction) => {
  try {
    const nft = await db.models.NFT.findOne({ where: { id } });

    return nft;
  } catch (error) {
    next(error);
  }
};

const updateNFT = async (id : number, data : NFTDTO, next : NextFunction) => {
  try {
    await db.models.NFT.update({Owner : data.Owner},{where : {id}})
  } catch (error) {
    next(error);
  }
}

const createNFTTest = async (data: NFTData, txDataid?: any) => {
  try {
    const {
      tokenId,
      name,
      description,
      imageUrl,
      creatorAddress,
      Owner,
      num,
    } = data;

    const result = await db.models.NFT.create({
      tokenId,
      name,
      description,
      imageUrl,
      creatorAddress,
      Owner,
    });
    const asd = await db.models.Tx.update(
      { NFT_id: result.dataValues.id },
      { where: { id: txDataid } }
    );
    console.log("asdasdsad", asd);
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
const isExist = async (tokenId: number) => {
  try {
    const result = await db.models.NFT.findOne({
      where: {
        tokenId: tokenId,
      },
    });
    return result !== undefined && result !== null ? true : false;
  } catch (error) {
    console.log("isExist", error);
  }
};
// NFT.service.ts

// const isDuplicateNFT = async (
//   tokenId: string,
//   newOwner: string
// ): Promise<boolean> => {
//   try {
//     console.log("tokenID,newOwner", tokenId, newOwner);
//     const tokenID = tokenId;
//     const existingNFT: any = await db.models.NFT.findOne({
//       where: {
//         token_id: tokenID,
//       },
//     });

//     if (existingNFT) {
//       // NFT가 이미 존재하는 경우

//       if (existingNFT.Owner !== newOwner) {
//         // 소유자가 변경된 경우에만 업데이트
//         await existingNFT.update({ owner: newOwner });
//       }

//       return true; // 이미 존재하는 NFT
//     }

//     return false; // 존재하지 않는 NFT
//   } catch (error) {
//     console.log("isDuplicateNFT", error);
//     return false; // 오류 발생 시 중복으로 처리하지 않도록 false 반환
//   }
// };
const isDuplicateNFT = async (
  id: string,
  name: string,
  newOwner: string
): Promise<boolean> => {
  try {
    console.log("id, name, newOwner", id, name, newOwner);
    // 동일한 ID 또는 이름을 가진 NFT 중에서 소유자가 변경된 경우에만 업데이트
    const existingNFTs: any[] = await db.models.NFT.findAll({
      where: {
        [Op.or]: [{ token_id: id }, { name: name }],
      },
    });

    for (const existingNFT of existingNFTs) {
      if (existingNFT.Owner !== newOwner) {
        // 소유자가 변경된 경우에만 업데이트
        await existingNFT.update({ Owner: newOwner });
      }
    }

    return existingNFTs.length > 0; // 존재하는 NFT 여부 반환
  } catch (error) {
    console.log("isDuplicateNFT", error);
    return false; // 오류 발생 시 중복으로 처리하지 않도록 false 반환
  }
};

export default {
  createNFT,
  createNFTTest,
  isExist,
  viewAllNFTs,
  viewOneNFT,
  NFTtabledestroy,
  updateNFT
  isDuplicateNFT,
};
