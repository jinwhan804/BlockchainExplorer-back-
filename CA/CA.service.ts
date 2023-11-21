import CADTO from "./CA.dto";
import db from "../database";
import { CAData } from "./CA.model";
import { NextFunction } from "express";

const createCA = async (data: CADTO, next : NextFunction) => {
  try {
    await db.models.CA.create({
      address : data.address,
      abiSigniture : data.abiSigniture,
      signitureNames : data.signitureNames,
    });
  } catch (error) {
    next(error);
  }
};

const viewOneCA = async (id : number, next : NextFunction) => {
  try {
    const ca = await db.models.CA.findOne({where : {id}});

    return ca;
  } catch (error) {
    next(error);
  }
};

const updateCA = async (id : number, data : CADTO, next : NextFunction) => {
  try {
    await db.models.CA.update({abi : data.abi},{where : {id}});
  } catch (error) {
    next(error);
  }
}

const findCAtype = async () => {
  try {
    const result = await db.models.CA.findAll({});

    return result;
  } catch (error) {
    console.log("findCAtype", error);
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

export default { createCA, createCATest, findCAtype, viewOneCA, updateCA };