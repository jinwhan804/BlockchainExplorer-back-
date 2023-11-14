import CADTO from "./CA.dtos";
import db from "../database";
import { CAData } from "./CA.model";

const createCA = async (data: CADTO) => {
  try {
    const { address, abiSigniture, signitureNames } = data;

    await db.models.CA.create({
      address,
      abiSigniture,
      signitureNames,
    });
  } catch (error) {
    console.log("CA 서비스에서 CA 데이터 추가하다 에러남");
    console.log(error);
  }
};

const createCATest = async (data: CAData) => {
  try {
    const { address, abiSigniture, signitureNames, CAtype } = data;
    await db.models.CA.create({
      address,
      CAtype,
      abiSigniture,
      signitureNames,
    });
  } catch (error) {
    console.log("createCATest에서 오류발생", error);
  }
};

export default { createCA, createCATest };
