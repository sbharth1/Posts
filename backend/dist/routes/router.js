"use strict";
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const signup_1 = require("../controllers/auth/signup");
const posts_1 = require("../controllers/auth/posts");
const user_1 = require("../controllers/auth/user");
const jwt_1 = require("../utils/jwt");
const likeAndComment_1 = require("../controllers/auth/likeAndComment");
const router = (0, express_1.Router)();
// get routes
router.get("/getposts", posts_1.getPosts);
router.get("/userpost", jwt_1.verifyToken, user_1.user);
// post rotues
router.post("/login", login_1.login);
router.post("/signup", signup_1.signup);
router.post("/userpost/:id/like", jwt_1.verifyToken, likeAndComment_1.like);
module.exports = router;
