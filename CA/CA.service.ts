import CADTO from "./CA.dto";
import db from "../database";
import { CAData } from "./CA.model";
import { NextFunction } from "express";
import sequelize from "sequelize";

const createCA = async (data: CADTO, next: NextFunction) => {
  try {
    await db.models.CA.create({
      address: data.address,
      abiSigniture: data.abiSigniture,
      signitureNames: data.signitureNames,
    });
  } catch (error) {
    next(error);
  }
};

const viewOneCA = async (id: number, next: NextFunction) => {
  try {
    const ca = await db.models.CA.findOne({ where: { id } });

    return ca;
  } catch (error) {
    next(error);
  }
};

const updateCA = async (id: number, data: CADTO, next: NextFunction) => {
  try {
    await db.models.CA.update({ abi: data.abi }, { where: { id } });
  } catch (error) {
    next(error);
  }
};

const findCAtype = async () => {
  try {
    const result = await db.models.CA.findAll({});
    return result;
  } catch (error) {
    console.log("findCAtype", error);
  }
};
const findTxByCAType = async (caType: string) => {
  try {
    // CA 타입이 'erc721'인 CA 정보 가져오기
    const ca = await db.models.CA.findOne({
      where: { CAtype: caType },
      include: [
        {
          model: db.models.TxCA, // Tx 정보도 함께 가져오기
        },
      ],
    });

    if (!ca) {
      console.log(`CA with type ${caType} not found.`);
      return null;
    }

    // CA에 연결된 Tx 정보 출력
    console.log(`Tx information for CA with type ${caType}`);
    console.log(ca);

    return ca; // 반환할 때는 연결된 Tx 정보를 반환하거나 다른 방식으로 활용할 수 있습니다.
  } catch (error) {
    console.log("findTxByCAType", error);
  }
};

const createCATest = async (data: CAData) => {
  try {
    const { address, abiSigniture, signitureNames, CAtype } = data;
    const result = await db.models.CA.create({
      address,
      CAtype,
      abiSigniture,
      signitureNames,
    });
    return result;
  } catch (error) {
    console.log("createCATest에서 오류발생", error);
  }
};

export default {
  createCA,
  createCATest,
  findCAtype,
  viewOneCA,
  updateCA,
  findTxByCAType,
};
