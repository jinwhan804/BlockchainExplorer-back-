import Web3 from "web3";

const testfun = async () => {
  const RPC_URL =
    "wss://sepolia.infura.io/ws/v3/d22607d7f58545f99e3c0eadcbf00eb4";
  const web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));

  const txHash =
    "0x3153cd61cf41fece0f92a1a4c1f657f90f8e4603ba5726fab095756223f4c24d";

  const result = await web3.eth.getTransactionReceipt(txHash);
  console.log(result);
  const transferEvents = result.logs.filter(
    (log: any) =>
      log.topics[0] === web3.utils.sha3("Transfer(address,address,uint256)")
  );

  if (transferEvents.length > 0) {
    console.log("This transaction includes ERC-721 token transfer.");
  } else {
    console.log("This transaction does not include ERC-721 token transfer.");
  }
};

testfun();
