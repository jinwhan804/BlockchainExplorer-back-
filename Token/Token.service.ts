import TokenDTO from "./Token.dto";
import db from "../database";
import { TokenData } from "./Token.model";
import { NextFunction } from "express";

const createToken = async (data: TokenDTO, next : NextFunction) => {
  try {
    const {
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    } = data;

    await db.models.Token.create({
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    });
  } catch (error) {
    next(error);
  }
};

const viewAllTokens = async (next : NextFunction) => {
  try {
    const tokens = await db.models.Token.findAll();

    return tokens;
  } catch (error) {
    next(error);
  }
}

const viewOneToken = async (id : number, next : NextFunction) => {
  try {
    const token = await db.models.Token.findOne({where : {id}});

    return token;
  } catch (error) {
    next(error);
  }
}

const createTokentest = async (data: TokenData) => {
  try {
    const {
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    } = data;

    await db.models.Token.create({
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    });
  } catch (error) {
    console.log("토큰 서비스에서 토큰 데이터 추가하다 에러남");
    console.log(error);
  }
};
const isExist = async (address: string) => {
  try {
    const result = await db.models.Token.findOne({
      where: {
        contract_address: address,
      },
    });
    return result !== undefined && result !== null ? true : false;
  } catch (error) {
    console.log("isExist", error);
  }
};

export default { createToken, createTokentest, isExist, viewAllTokens, viewOneToken };
