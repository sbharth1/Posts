"use strict";
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const signup_1 = require("../controllers/auth/signup");
const posts_1 = require("../controllers/auth/posts");
const router = (0, express_1.Router)();
// get routes
router.get("/getposts", posts_1.getPosts);
// post rotues
router.post("/login", login_1.login);
router.post("/signup", signup_1.signup);
module.exports = router;
