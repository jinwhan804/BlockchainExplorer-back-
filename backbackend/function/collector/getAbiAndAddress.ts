import Web3 from "web3";
import { CA } from "../../etc/testCA";
import * as fs from "fs";
import {
  pokemonstestabi,
  erc1155abi,
  erc721abi,
  erc721abipublic,
  erc1155abipublic,
  erc20abipublic,
  erc20abi,
} from "../../Sig_abi_Arrary/testabiinfo";
import { ContractABI } from "../../Interface/CA_Interface";
import { getProvider } from "../config";

const contractAddress2 = "0x1D41745c4f64e60b7c77FFaf613a3D0330ae4e79";

let jsonData: any;

export const readjson = async (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        console.error("파일을 읽을 수 없습니다: ", error);
        reject(error); // Promise를 실패 상태로 변경
      } else {
        try {
          const jsonData = JSON.parse(data);
          // console.log("JSON 파일 내용: ", jsonData);
          // 이제 jsonData를 사용할 수 있습니다.
          resolve(jsonData); // Promise를 성공 상태로 변경
        } catch (parseError) {
          console.error("JSON 파싱 오류: ", parseError);
          reject(parseError); // Promise를 실패 상태로 변경
        }
      }
    });
  });
};

const saveABIandAddress = async () => {
  const web3 = await getProvider();
  const newcontract = new web3.eth.Contract(erc20abi, contractAddress2);
  const jsonData = await readjson(
    "/Users/jeonghyeon-ug/Desktop/lastprojectunion/back/ztest/erc721public.json"
  );
  // console.log(jsonData);

  const arr = [];
  const namearr = [];
  for (let i: number = 0; i < jsonData.length; i++) {
    try {
      if (
        jsonData[i].type === "constructor" ||
        jsonData[i].type === "event" ||
        jsonData[i].name == null ||
        jsonData[i].type === "error"
      ) {
        continue;
      } else {
        namearr.push(jsonData[i].name);

        arr.push(web3.eth.abi.encodeFunctionSignature(jsonData[i]));
      }
    } catch (error) {
      // console.log(error);
    }
  }
  console.log("result", arr, namearr);
};
