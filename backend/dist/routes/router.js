"use strict";
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const signup_1 = require("../controllers/auth/signup");
const router = (0, express_1.Router)();
router.post("/login", login_1.login);
router.post("/signup", signup_1.signup);
module.exports = router;
