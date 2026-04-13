import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/health", (req, res, next) => {
	res.status(200).json({ message: "Health check successful" });
});
router.post("/login", AuthController.login);


export default router;