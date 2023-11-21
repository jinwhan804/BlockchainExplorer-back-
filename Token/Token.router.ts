import express from "express";
import TokenControllers from "./Token.controller";

const router = express.Router();

router.get('/', TokenControllers.ViewAllTokens);

router.get('/:id', TokenControllers.ViewOneToken);

export default router;
