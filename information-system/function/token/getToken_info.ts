import {
  pokemonstestabi,
  erc1155abi,
  erc721abi,
  erc721abipublic,
  erc1155abipublic,
  erc20abipublic,
  erc20abi,
} from "../../Sig_abi_Arrary/testabiinfo";
// Sepolia 테스트넷의 WebSocket RPC URL 설정
import { readjson } from "../collector/getAbiAndAddress";
import { getProvider } from "../config";
import CAservice from "../../../CA/CA.service";
import Tokenservice from "../../../Tokens/Token.service";
import { TokenData } from "../../../Tokens/Token.model";

export const getTokeninfo = async () => {
  const web3 = await getProvider();
  let jsonData;
  let address;
  let tmparr = [];
  const result = await CAservice.findCAtype();
  if (result !== undefined) {
    for (let i = 0; i < result.length; i++) {
      address = result[i].dataValues.address;
      if (await Tokenservice.isExist(address)) {
        console.log("이미있는 토큰인데수웅");
        continue;
      }
      if (result[i].dataValues.CAtype == ``) {
        continue;
      } else if (result[i].dataValues.CAtype == `erc-20`) {
        jsonData = await readjson(
          "/Users/jeonghyeon-ug/Desktop/lastprojectunion/back/backbackend/JSON/erc20.json"
        );
        tmparr.push({
          index: i,
          address: address,
          jsonData: jsonData,
          // 추가 필요한 다른 속성도 여기에 추가할 수 있음
        });
      } else if (result[i].dataValues.CAtype == `erc-721`) {
        jsonData = await readjson(
          "/Users/jeonghyeon-ug/Desktop/lastprojectunion/back/backbackend/JSON/erc721.json"
        );
        tmparr.push({
          index: i,
          address: address,
          jsonData: jsonData,
          // 추가 필요한 다른 속성도 여기에 추가할 수 있음
        });
      } else if (result[i].dataValues.CAtype == `erc-1155`) {
        jsonData = await readjson(
          "/Users/jeonghyeon-ug/Desktop/lastprojectunion/back/backbackend/JSON/erc1155.json"
        );
        tmparr.push({
          index: i,
          address: address,
          jsonData: jsonData,
          // 추가 필요한 다른 속성도 여기에 추가할 수 있음
        });
      }
    }
  }

  tmparr.forEach(async (value) => {
    const contract = new web3.eth.Contract(value.jsonData, value.address);
    try {
      const data: TokenData = {
        name: await contract.methods.name().call(),
        contract_address: value.address,
        symbol: await contract.methods.symbol().call(),
        owner_address: "",
        decimal: await contract.methods.decimals().call(),
        circulating_supply: await contract.methods.totalSupply().call(),
      };
      Tokenservice.createTokentest(data);
    } catch (error) {
      console.error(" 오류 발생:", error);
    }
  });
  // const contract = new web3.eth.Contract(jsonData, address);

  // try {
  //   const data: TokenData = {
  //     name: await contract.methods.name().call(),
  //     contract_address: address,
  //     symbol: await contract.methods.symbol().call(),
  //     owner_address: "",
  //     decimal: await contract.methods.decimals().call(),
  //     circulating_supply: await contract.methods.totalSupply().call(),
  //   };
  //   Tokenservice.createTokentest(data);
  // } catch (error) {
  //   console.error(" 오류 발생:", error);
  // }
};

// getTokeninfo();
