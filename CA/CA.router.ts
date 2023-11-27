import express from "express";
import CAControllers from "./CA.controller";

const router = express.Router();

router.get("/", CAControllers.ViewOneCA);

router.put("/", CAControllers.UpdateCA);

export default router;
