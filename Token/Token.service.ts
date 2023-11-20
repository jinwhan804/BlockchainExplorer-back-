import TokenDTO from "./Token.dto";
import db from "../database";
import { TokenData } from "./Token.model";

const createToken = async (data: TokenDTO) => {
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

export default { createToken, createTokentest, isExist };
