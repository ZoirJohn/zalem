import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";

const router = express.Router();

router.get("/health", (req, res, next) => {
	res.status(200).json({ message: "Health check successful" });
});
router.post("/auth/register", body("email").isEmail(), body("fullname").isLength({ min: 1, max: 255 }), body("password").isLength({ min: 7, max: 32 }), AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/google", AuthController.loginWithGoogle);
router.get("/auth/google/callback", AuthController.loginWithGoogleCallback);
router.get("/auth/facebook", AuthController.loginWithFacebook);
router.get("/auth/facebook/callback", AuthController.loginWithFacebookCallback);

export default router;