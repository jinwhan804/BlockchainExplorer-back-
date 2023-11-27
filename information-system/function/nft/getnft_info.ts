import { getProvider } from "../config";
import { readjson } from "../collector/getAbiAndAddress";
import CAservice from "../../../CA/CA.service";
import { NFTData } from "../../../NFT/NFT.model";
import NFTservice from "../../../NFT/NFT.service";
import TxService from "../../../Tx/Tx.service";
import TxCAService from "../../../TxCA/TxCA.service";
import { DIRNAME } from "../../JSON";
import path from "path";
import NFTService from "../../../NFT/NFT.service";
import BlockService from "../../../Block/Block.service";
// BlockService.findOneblock 함수에서 반환되는 값에 대한 타입 확인
interface BlockInfo {
  blockNumber: number;
  // 다른 필요한 속성들이 있다면 추가
}

// getnftinfo 함수 내에서 사용할 타입
interface NFTInfo {
  tokenId: string;
  creator: string;
  owner: string;
  transactionhash: string;
}

// getnftinfo 함수 수정
export const getnftinfo = async () => {
  try {
    let web3: any = await getProvider();
    const jsonFilePath = path.join(DIRNAME, "erc721public.json");
    const jsonData = await readjson(jsonFilePath);
    const result: any = await CAservice.findCAtype();

    if (result) {
      const tmparr: NFTData[] = [];
      for await (const ca of result) {
        if (ca.dataValues.CAtype === "erc-721") {
          const contract = new web3.eth.Contract(
            jsonData,
            ca.dataValues.address
          );
          const cm = contract.methods as any;
          for (let i = 0; i < ca.dataValues.txs.length; i++) {
            const tmp: any = await BlockService.findOneblock(
              ca.dataValues.txs[i].dataValues.block_id
            );

            let asd = tmp.dataValues.number;

            // let tmparr: NFTData[] = [];
            const pastEvents: any = await contract.getPastEvents("allEvents", {
              fromBlock: Number(tmp.dataValues.number) - 100,
              toBlock: Number(tmp.dataValues.number),
            });
            console.log(pastEvents);

            const tmparr2: { [tokenId: string]: NFTInfo } = {};
            for (const pastEvent of pastEvents) {
              const tokenId = pastEvent.returnValues.tokenId;
              if (tokenId) {
                if (!tmparr2[tokenId]) {
                  tmparr2[tokenId] = {
                    tokenId,
                    creator: pastEvent.returnValues.to,
                    owner: pastEvent.returnValues.to,
                    transactionhash: pastEvent.transactionHash,
                  };
                } else {
                  tmparr2[tokenId].owner = pastEvent.returnValues.to;
                }
              }
            }
            const tmparr3 = Object.values(tmparr2);
            for (const value of tmparr3) {
              try {
                const tokenURI: any = await cm.tokenURI(value.tokenId).call();
                let httpURI: string = "";
                console.log(tokenURI);
                if (
                  tokenURI.includes("http://") ||
                  tokenURI.includes("ipfs:")
                ) {
                  const ipfsHash = await tokenURI.replace(/^ipfs:\/\//, "");
                  const ipfsGateway = "https://ipfs.io/ipfs/";
                  httpURI = ipfsGateway + ipfsHash;
                } else {
                  try {
                    const regex = /^ipfs:\/\/([^/]+)\/([^/]+)$/;
                    const match = tokenURI.match(regex);
                    const hash = match[1];
                    const filename = match[2];
                    httpURI = hash;
                  } catch (error) {
                    console.log(error);
                  }
                }

                const metadata: any = await fetchDataWithDelay(httpURI);
                const data: NFTData = {
                  tokenId: value.tokenId || metadata.edition,
                  name: metadata.name,
                  description: metadata.description,
                  imageUrl: metadata.image_data || metadata.image,
                  creatorAddress: value.creator,
                  Owner: value.owner,
                  transactionhash: value.transactionhash,
                };
                const isDuplicate = await NFTService.isDuplicateNFT(
                  data.tokenId.toString(),
                  data.name,
                  data.Owner
                );
                console.log("중복인가?", isDuplicate, tmparr);
                if (!isDuplicate) {
                  tmparr.push(data);
                }
              } catch (error) {
                console.log("getnftinfo", error);
              }
            }
          }
        }
      }
      console.log("!@#!@#!", tmparr);
      if (tmparr.length > 0) {
        for (const data of tmparr) {
          if (data.transactionhash) {
            const txDataid = await TxService.getFindone(data.transactionhash);
            try {
              await NFTservice.createNFTTest(data, txDataid?.dataValues.id);
            } catch (error) {
              console.log("getnftinfo", error);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log("getnftinfo", error);
  }
};

async function fetchDataWithDelay(tokenURI: string): Promise<any> {
  try {
    console.log("fetchDataWithDelay", tokenURI);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(tokenURI);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
