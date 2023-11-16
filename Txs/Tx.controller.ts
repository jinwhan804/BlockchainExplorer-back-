import TxDTO from "./Tx.dto";
import TxServices from "./Tx.service";
import { Request, Response } from "express";

const CreateTx = async (req: Request, res: Response) => {
  try {
    const reqDTO = new TxDTO(req.body);

    await TxServices.createTx(reqDTO);

    res.send();
  } catch (error) {
    console.log(
      "트랜잭션 데이터 컨트롤러에서 트랜잭션 데이터 추가하다가 에러남"
    );
    console.log(error);
  }
};

export default { CreateTx };
