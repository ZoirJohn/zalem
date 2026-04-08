import express from "express";

const router = express.Router();

router.get("/health", (req, res, next) => {
	res.status(200).json({ message: "Health check successful" });
});

export default router;
