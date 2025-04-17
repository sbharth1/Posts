import {Router} from 'express'
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';
import { getPosts } from '../controllers/auth/posts';
import { user } from '../controllers/auth/user';
import { verifyToken } from '../utils/jwt';
import { like } from '../controllers/auth/likeAndComment';
import { deleteUser } from '../controllers/auth/delete';


const router = Router();

// get routes
router.get("/getposts",getPosts);
router.get("/userpost",verifyToken,user)

// post rotues
router.post("/login",login);
router.post("/signup",signup);
router.post("/userpost/:id/like",verifyToken,like)

// post delete 
router.delete("/userdelete/:id/delete",deleteUser)

export = router;