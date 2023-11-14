import CADTO from "./CA.dtos";
import CAServices from "./CA.services";
import { Request, Response } from "express";

const CreateCA = async (req : Request, res : Response) => {
    try {
        const reqDTO = new CADTO(req.body);

        await CAServices.createCA(reqDTO);

        res.send();
    } catch (error) {
        console.log('CA 데이터 컨트롤러에서 CA 데이터 추가하다가 에러남');
        console.log(error);
    }
}

export default { CreateCA };