import CADTO from "./CA.dto";
import CAServices from "./CA.service";
import { NextFunction, Request, Response } from "express";

const CreateCA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqDTO = new CADTO(req.body);

    await CAServices.createCA(reqDTO, next);

    res.send();
  } catch (error) {
    next(error);
  }
};

const ViewOneCA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const data = await CAServices.viewOneCA(id, next);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const UpdateCA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const id = Number(req.params.id);
    const data = new CADTO(req.body);
    await CAServices.updateCA(data, next);

    res.send();
  } catch (error) {
    next(error);
  }
};

const FindCA = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const address = req.params.address.toString();
    const data = await CAServices.findCA(address, next);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

export default { CreateCA, ViewOneCA, UpdateCA, FindCA };
