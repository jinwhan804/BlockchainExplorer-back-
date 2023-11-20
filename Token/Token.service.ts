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

const createTokentest = async (data: TokenData, contract_address: any) => {
  try {
    const {
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    } = data;

    const result = await db.models.Token.create({
      contract_address,
      name,
      symbol,
      owner_address,
      decimal,
      circulating_supply,
    });
    // 'from' 열의 값을 찾아서 'token_id' 업데이트
    await db.models.Tx.update(
      { token_id: result.dataValues.id }, // 업데이트할 값
      { where: { from: contract_address } } // 조건
    );

    // 'to' 열의 값을 찾아서 'token_id' 업데이트
    await db.models.Tx.update(
      { token_id: result.dataValues.id }, // 업데이트할 값
      { where: { to: contract_address } } // 조건
    );
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
    return result;
  } catch (error) {
    console.log("isExist", error);
  }
};

export default { createToken, createTokentest, isExist };
