"use strict";
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const signup_1 = require("../controllers/auth/signup");
const posts_1 = require("../controllers/auth/posts");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
// get routes
router.get("/allposts", jwt_1.verifyToken, posts_1.getPosts);
// post rotues
router.post("/login", login_1.login);
router.post("/signup", signup_1.signup);
module.exports = router;
