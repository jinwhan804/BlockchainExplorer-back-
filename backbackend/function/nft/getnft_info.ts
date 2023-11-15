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
  interface NFTInfo {
    tokenId: string; // 토큰 ID
    creator: string; // 생성자 소유자
    owner: string; // 현재 소유자
  }
  let tmparr: NFTData[] = [];

  if (result !== undefined) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].dataValues.CAtype == `erc-721`) {
        let isExecuted = false;
        let tmparr2: NFTInfo[] = [];

        const contract = new web3.eth.Contract(
          jsonData,
          result[i].dataValues.address
        );
        const cm = contract.methods as any;
        let pastEvents: any = await contract.getPastEvents("allEvents", {
          fromBlock: 0,
          toBlock: "latest",
        });
        const name = await cm.name().call();
        // const symbol = await cm.symbol().call();
        for (let i = 0; i < pastEvents.length; i++) {
          console.log(i);
          if (
            pastEvents[i].returnValues &&
            pastEvents[i].returnValues.tokenId
          ) {
            if (!isExecuted) {
              tmparr2.push({
                tokenId: pastEvents[i].returnValues.tokenId,
                creator: pastEvents[i].returnValues.to,
                owner: pastEvents[i].returnValues.to,
              });
              isExecuted = true;
              console.log("#########", tmparr2);
            }

            for (let n = 0; n < tmparr2.length; n++) {
              for (let j = 0; j < tmparr2.length; j++) {
                if (tmparr2[n].tokenId !== tmparr2[j].tokenId) {
                  tmparr2.push({
                    tokenId: pastEvents[i].returnValues.tokenId,
                    creator: pastEvents[i].returnValues.to,
                    owner: pastEvents[i].returnValues.to,
                  });
                } else if (tmparr2[n].tokenId == tmparr2[j].tokenId) {
                  tmparr2[n].owner = pastEvents[i].returnValues.to;
                }
              }
            }
          }
        }
        console.log(tmparr2);
        for (const value of tmparr2) {
          const tokenURI = await cm.tokenURI(value.tokenId).call();
          const response = await fetch(tokenURI);
          const metadata = await response.json();

          let data: NFTData = {
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
