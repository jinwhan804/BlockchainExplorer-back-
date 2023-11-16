import EOADTO from "./EOA.dto";
import EOAServices from "./EOA.service";
import { Request, Response } from "express";

const CreateEOA = async (req : Request, res : Response) => {
    try {
        const reqDTO = new EOADTO(req.body);

        await EOAServices.createEOA(reqDTO);

        res.send();
    } catch (error) {
        console.log('EOA 데이터 컨트롤러에서 EOA 데이터 추가하다가 에러남');
        console.log(error);
    }
}

export default { CreateEOA };