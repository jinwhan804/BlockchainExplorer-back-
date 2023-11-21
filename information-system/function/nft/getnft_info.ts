import { getProvider } from "../config";
import { readjson } from "../collector/getAbiAndAddress";
import CAservice from "../../../CA/CA.service";
import { NFTData } from "../../../NFT/NFT.model";
import NFTservice from "../../../NFT/NFT.service";
import { EventLog } from "web3";
import TxService from "../../../Tx/Tx.service";
import TxCAService from "../../../TxCA/TxCA.service";

export const getnftinfo = async () => {
  const web3 = await getProvider();
  const jsonData = await readjson(
    "/Users/jeonghyeon-ug/Desktop/lastlastlastproject/back/information-system/JSON/erc721public.json"
  );
  // const result = await CAservice.findCAtype();
  // await NFTservice.NFTtabledestroy();
  const result = await CAservice.findCAtype();
  // console.log(result);

  if (result !== undefined && result !== undefined) {
    const tmparr: NFTData[] = [];

    for (const ca of result) {
      if (ca.dataValues.CAtype === "erc-721") {
        console.log("응애");
        const contract = new web3.eth.Contract(jsonData, ca.dataValues.address);
        const cm = contract.methods as any;
        // const asd = await CAservice.findTxByCAType("erc-721");
        // console.log("!@##!", asd);

        const pastEvents: any = await contract.getPastEvents("allEvents", {
          fromBlock: 0,
          toBlock: "latest",
        });

        const tmparr2: { [tokenId: string]: NFTInfo } = {};

        for (const pastEvent of pastEvents) {
          const tokenId = pastEvent.returnValues.tokenId;
          if (tokenId !== null && tokenId !== undefined) {
            if (!tmparr2[tokenId]) {
              tmparr2[tokenId] = {
                tokenId,
                creator: pastEvent.returnValues.to,
                owner: pastEvent.returnValues.to,
              };
              console.log("2", tmparr2[tokenId]);
            } else {
              tmparr2[tokenId].owner = pastEvent.returnValues.to;
            }
          }
        }

        const tmparr3 = Object.values(tmparr2);

        console.log("3", tmparr3);
        for (const value of tmparr3) {
          const tokenURI = await cm.tokenURI(value.tokenId).call();
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          console.log(metadata);

          const data: NFTData = {
            token_id: value.tokenId,
            name: metadata.name,
            description: metadata.description,
            image_url: metadata.image_data || metadata.image,
            creator_address: value.creator,
            Owner: value.owner,
            num: ca.dataValues.id,
          };
          tmparr.push(data);
        }
      }
    }

    if (tmparr.length > 0) {
      // tmparr에 데이터가 있다면 추가 작업 수행
      for (const value of tmparr) {
        const result = await TxService.getFindone(value.creator_address);

        try {
          await NFTservice.createNFTTest(value, result?.dataValues.id);
        } catch (error) {
          console.log("getnftinfo", error);
        }
      }
    }

    console.log("tmparr", tmparr);
  }

  console.log("문제 없나..?");
};

interface NFTInfo {
  tokenId: string; // 토큰 ID
  creator: string; // 생성자 소유자
  owner: string; // 현재 소유자
}
