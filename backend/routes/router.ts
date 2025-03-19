import {Router} from 'express'
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/signup';


const router = Router();

router.post("/login",login);
router.post("/signup",signup);

export = router;