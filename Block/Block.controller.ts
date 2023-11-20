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

const ViewAllBlocks = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const data = await BlockServices.viewAllBlocks(next);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

const ViewOneBlock = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const id = Number(req.params);
        const data = await BlockServices.viewOneBlock(id, next);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

export default { CreateBlock, ViewAllBlocks, ViewOneBlock };