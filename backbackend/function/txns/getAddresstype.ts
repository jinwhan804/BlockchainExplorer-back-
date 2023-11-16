import { hash } from "bcrypt";
import db from "../../../database";
import CAServices from "../../../CAs/CA.service";
import EOAServices from "../../../EOAs/EOA.service";
import { CAData } from "../../../CAs/CA.model";
import { EOAData } from "../../../EOAs/EOA.model";
import {
  signitureERC20public,
  signiturenameERC20public,
  signiturenameERC721public,
  signitureERC721public,
  signitureERC1155,
  signiturenameERC1155,
} from "../../Sig_abi_Arrary/sigInterface";

export const getAddresstype = async (
  hash: string,
  addressType: string,
  sigEvaluateresult?: string
) => {
  if (addressType == "contract") {
    const result = await db.models.CA.findOne({
      where: {
        address: hash,
      },
    });
    let result2: CAData;
    if (sigEvaluateresult?.startsWith("erc-20")) {
      result2 = {
        CAtype: "erc-20",
        address: hash,
        abiSigniture: signitureERC20public,
        signitureNames: signiturenameERC20public,
      };

      result == null
        ? CAServices.createCATest(result2)
        : console.log("이미있구만유");
    } else if (sigEvaluateresult?.startsWith("erc-721")) {
      result2 = {
        CAtype: "erc-721",
        address: hash,
        abiSigniture: signitureERC721public,
        signitureNames: signiturenameERC721public,
      };

      result == null
        ? CAServices.createCATest(result2)
        : console.log("이미있구만유");
    } else if (sigEvaluateresult?.startsWith("erc-1155")) {
      result2 = {
        CAtype: "erc-1155",
        address: hash,
        abiSigniture: signitureERC1155,
        signitureNames: signiturenameERC1155,
      };

      result == null
        ? CAServices.createCATest(result2)
        : console.log("이미있구만유");
    } else {
      result2 = {
        CAtype: "",
        address: hash,
        abiSigniture: [""],
        signitureNames: [""],
      };

      result == null
        ? CAServices.createCATest(result2)
        : console.log("이미있구만유");
    }
  } else {
    const result = await db.models.EOA.findOne({
      where: {
        address: hash,
      },
    });
    let asd: bigint;
    let result2: EOAData = {
      address: hash,
      token: BigInt(0),
      ethBalance: BigInt(0),
    };
    result == null
      ? EOAServices.createEOATest(result2)
      : console.log("이미있구만유");
  }
};
