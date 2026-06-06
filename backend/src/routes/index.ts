import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import UsersController from "../controllers/users.controller";
import isAuthenticated from "../middlewares/authenticated.middleware";
import validate from "../middlewares/validate.middleware";
import ConversationController from "../controllers/conversation.controller";

const router = express.Router();

router.get("/health", (req, res, next) => {
    res.status(200).json({ message: "Health check successful" });
});
router.post("/auth/register", body("email").isEmail(), body("display_name").isLength({ min: 1, max: 255 }), body("password").isLength({ min: 7, max: 32 }), validate, AuthController.register);
router.post("/auth/login", body("email").isEmail(), validate, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/auth/google", AuthController.loginWithGoogle);
router.get("/auth/google/callback", AuthController.loginWithGoogleCallback);
router.get("/auth/facebook", AuthController.loginWithFacebook);
router.get("/auth/facebook/callback", AuthController.loginWithFacebookCallback);

router.get("/users", isAuthenticated, (req, res, next) => UsersController.users(req, res, next));
router.get("/users/me", isAuthenticated, (req, res, next) => UsersController.me(req, res, next));

router.get("/conversations/:receiverId", isAuthenticated,  ConversationController.getConversation);
router.get("/messages/:conversation_id", isAuthenticated,  ConversationController.getMessages);

export default router;
