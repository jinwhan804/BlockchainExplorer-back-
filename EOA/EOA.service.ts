import EOADTO from "./EOA.dto";
import db from "../database";
import { EOAData } from "./EOA.model";
import { NextFunction } from "express";

const createEOA = async (data: EOADTO, next : NextFunction) => {
  try {
    const { address, token, ethBalance } = data;

    await db.models.EOA.create({
      address,
      token,
      ethBalance,
    });
  } catch (error) {
    next(error);
  }
};

const viewOneEOA = async (id : number, next : NextFunction) => {
  try {
    const eoa = await db.models.EOA.findOne({where : {id}});

    return eoa;
  } catch (error) {
    next(error);
  }
}

const updateEOA = async (id : number, data : EOADTO, next : NextFunction) => {
  try {
    await db.models.EOA.update({
      address : data.address,
      token : data.token,
      ethbalance : data.ethBalance
    },{where : {id}});
  } catch (error) {
    next(error);
  }
}

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

export default { createEOA, createEOATest, viewOneEOA, updateEOA };
