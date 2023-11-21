import express from "express";
import EOAControllers from "./EOA.controller";

const router = express.Router();

router.get('/', EOAControllers.ViewOneEOA);

export default router;
