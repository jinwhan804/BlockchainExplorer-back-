import express from "express";
import dotenv from "dotenv";
import db from "./database";
import Web3 from "web3";
import coinRouter from "./Coin/Coin.routers";
import nftRouter from "./NFT/NFT.routers";
import tokenRouter from "./Token/Token.routers";
import txRouter from "./Tx/Tx.routers";
import blockRouter from "./Block/Block.routers";
import EOARouter from "./EOA/EOA.routers";
import CARouter from "./CA/CA.routers";
import cors from "cors"; // cors 패키지 추가
import { CollectStart_http } from "./information-system/function/CollectStart_http";
import { subscribetest } from "./information-system/function/CollectStart_websocket";
import { getRPC_URLtest } from "./information-system/function/config";
import { getnftinfo } from "./information-system/function/nft/getnft_info";

dotenv.config();

const app = express();
app.use(cors());

db.sync({ force: false })
  .then(() => {
    console.log("connect on");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/coin", coinRouter);
app.use("/nft", nftRouter);
app.use("/token", tokenRouter);
app.use("/tx", txRouter);
app.use("/block", blockRouter);
app.use("/eoa", EOARouter);
app.use("/ca", CARouter);

app.listen(8080, async () => {
  console.log("server open");

  if ((await getRPC_URLtest()) === "https://network.bouncecode.net/") {
    CollectStart_http();
  } else {
    subscribetest();
  }
  console.log("테스트 구문 끝");
});
