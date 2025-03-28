import {Router} from 'express'
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { getPosts } from '../controllers/auth/posts';
import { user } from '../controllers/auth/user';
import { verifyToken } from '../utils/jwt';


const router = Router();

// get routes
router.get("/getposts",getPosts);
router.get("/userpost",verifyToken,user)

// post rotues
router.post("/login",login);
router.post("/signup",signup);

export = router;