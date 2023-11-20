import EOADTO from "./EOA.dto";
import db from "../database";
import { EOAData } from "./EOA.model";

const createEOA = async (data: EOADTO) => {
  try {
    const { address, token, ethBalance } = data;

    await db.models.EOA.create({
      address,
      token,
      ethBalance,
    });
  } catch (error) {
    console.log("EOA 서비스에서 EOA 데이터 추가하다 에러남");
    console.log(error);
  }
};

const createEOATest = async (data: EOAData) => {
  try {
    const { address, token, ethBalance } = data;
    const result = await db.models.EOA.create({
      address,
      token,
      ethBalance,
    });
    return result;
  } catch (error) {
    console.log("createEOATest", error);
  }
};

export default { createEOA, createEOATest };
