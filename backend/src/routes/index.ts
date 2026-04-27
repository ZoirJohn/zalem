import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import UserController from "../controllers/user.controller";
import isAuthenticated from "../middlewares/authenticated.middleware";
import validate from "../middlewares/validate.middleware";

const router = express.Router();

router.get("/health", (req, res, next) => {
	res.status(200).json({ message: "Health check successful" });
});
router.post("/auth/register", body("email").isEmail(), body("displayName").isLength({ min: 1, max: 255 }), body("password").isLength({ min: 7, max: 32 }), validate, AuthController.register);
router.post("/auth/login", body("email").isEmail(), validate, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/auth/google", AuthController.loginWithGoogle);
router.get("/auth/google/callback", AuthController.loginWithGoogleCallback);
router.get("/auth/facebook", AuthController.loginWithFacebook);
router.get("/auth/facebook/callback", AuthController.loginWithFacebookCallback);

router.get("/users/me", isAuthenticated, UserController.me);

export default router;
