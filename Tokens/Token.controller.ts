import TokenDTO from "./Token.dto";
import TokenServices from "./Token.service";
import { Request, Response } from "express";

const CreateToken = async (req : Request, res : Response) => {
    try {
        const reqDTO = new TokenDTO(req.body);

        await TokenServices.createToken(reqDTO);

        res.send();
    } catch (error) {
        console.log('토큰 데이터 컨트롤러에서 토큰 데이터 추가하다가 에러남');
        console.log(error);
    }
}

export default { CreateToken };