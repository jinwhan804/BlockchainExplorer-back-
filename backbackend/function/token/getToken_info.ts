import Web3 from "web3";

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

const getTokeninfo = async () => {
  const web3 = await getProvider();

  const jsonData = await readjson(
    "/Users/jeonghyeon-ug/Desktop/lastprojectunion/back/backbackend/JSON/erc20.json"
  );

  const contract = new web3.eth.Contract(
    jsonData,
    "0xc9404f5c21555F4460515b84704a6812b2588f5c"
  );

  try {
    const name = await contract.methods.symbol().call();
    // console.log(`토큰 잔액: ${web3.utils.fromWei(balance, "ether")} DAI`);
    console.log(name);
  } catch (error) {
    console.error(" 오류 발생:", error);
  }
};
// getTokeninfo();
