import BlockDTO from "./Block.dto";
import BlockServices from "./Block.service";
import { NextFunction, Request, Response } from "express";

const CreateBlock = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const reqDTO = new BlockDTO(req.body);

        await BlockServices.createBlock(reqDTO, next);

        res.send();
    } catch (error) {
        next(error);
    }
}

const ViewAllBlock = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const data = await BlockServices.viewAllBlocks(next);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

export default { CreateBlock, ViewAllBlock };