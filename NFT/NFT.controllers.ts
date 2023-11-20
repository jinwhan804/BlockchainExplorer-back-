import NFTDTO from "./NFT.dtos";
import NFTServices from "./NFT.service";
import { Request, Response } from "express";

const CreateNFT = async (req: Request, res: Response) => {
  try {
    const reqDTO = new NFTDTO(req.body);

    await NFTServices.createNFT(reqDTO);

    res.send();
  } catch (error) {
    console.log("NFT 데이터 컨트롤러에서 NFT 데이터 추가하다가 에러남");
    console.log(error);
  }
};

export default { CreateNFT };
