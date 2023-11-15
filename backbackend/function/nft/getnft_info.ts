import { getProvider } from "../config";
import { readjson } from "../collector/getAbiAndAddress";

export const getnftinfo = async () => {
  const web3 = await getProvider();
  let jsonData;
  jsonData = await readjson(
    "/Users/jeonghyeon-ug/Desktop/lastlastlastproject/back/backbackend/JSON/erc721public.json"
  );

  const contract = new web3.eth.Contract(
    jsonData,
    "0xAD043fC12C6c34f9f02826778e49aa511d84aCeD"
  );
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  // const totalsupply = await contract.methods.totalSupply().call();
  console.log(name);
  console.log(symbol);
  // console.log(totalsupply);
  const pastEvents = await contract.getPastEvents("allEvents", {
    fromBlock: 0,
    toBlock: "latest",
  });

  pastEvents.forEach(async (event: any) => {
    if (event) {
      console.log("Token ID:", event.returnValues.tokenId);
      console.log(event.event);
      const cm = contract.methods as any;
      const tokenURI = await cm.tokenURI(event.returnValues.tokenId).call(); // 토큰 ID를 인자로 제공
      console.log(tokenURI);
    }
  });
};
