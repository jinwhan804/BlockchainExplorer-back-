import BlockDTO from "./Block.dtos";
import BlockServices from "./Block.service";
import { Request, Response } from "express";

const CreateBlock = async (req: Request, res: Response) => {
  try {
    const reqDTO = new BlockDTO(req.body);

    await BlockServices.createBlock(reqDTO);

    res.send();
  } catch (error) {
    console.log("블록 데이터 컨트롤러에서 블록 데이터 추가하다가 에러남");
    console.log(error);
  }
};

export default { CreateBlock };
