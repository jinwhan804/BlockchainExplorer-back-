import express from "express";
import BlockControllers from "./Block.controller";

const router = express.Router();

router.get('/', BlockControllers.ViewAllBlock);

export default router;