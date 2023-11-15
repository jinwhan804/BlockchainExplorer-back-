import { getProvider } from "../config";
import { readjson } from "../collector/getAbiAndAddress";
import CAservice from "../../../CAs/CA.services";
import { NFTData } from "../../../NFTs/NFT.model";
import NFTservice from "../../../NFTs/NFT.services";
import { EventLog } from "web3";

export const getnftinfo = async () => {
  const web3 = await getProvider();
  const jsonData = await readjson(
    "/Users/jeonghyeon-ug/Desktop/lastlastlastproject/back/backbackend/JSON/erc721public.json"
  );
  const result = await CAservice.findCAtype();

  if (result !== undefined) {
    const tmparr: NFTData[] = [];

    for (const ca of result) {
      if (ca.dataValues.CAtype === "erc-721") {
        const contract = new web3.eth.Contract(jsonData, ca.dataValues.address);
        const cm = contract.methods as any;

        const pastEvents: any = await contract.getPastEvents("allEvents", {
          fromBlock: 0,
          toBlock: "latest",
        });

        const tmparr2: { [tokenId: string]: NFTInfo } = {};

        for (const pastEvent of pastEvents) {
          const tokenId = pastEvent.returnValues.tokenId;

          if (tokenId) {
            if (!tmparr2[tokenId]) {
              tmparr2[tokenId] = {
                tokenId,
                creator: pastEvent.returnValues.to,
                owner: pastEvent.returnValues.to,
              };
            } else {
              tmparr2[tokenId].owner = pastEvent.returnValues.to;
            }
          }
        }

        const tmparr3 = Object.values(tmparr2);

        for (const value of tmparr3) {
          const tokenURI = await cm.tokenURI(value.tokenId).call();
          const response = await fetch(tokenURI);
          const metadata = await response.json();

          const data: NFTData = {
            token_id: value.tokenId,
            name: metadata.name,
            description: metadata.description,
            image_url: metadata.image_data,
            creator_address: value.creator,
            Owner: value.owner,
          };
          tmparr.push(data);
        }
      }
    }

    if (tmparr.length > 0) {
      // tmparr에 데이터가 있다면 추가 작업 수행
      for (const value of tmparr) {
        NFTservice.createNFTTest(value);
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
