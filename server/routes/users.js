import { Router } from "express"
import * as controllers from "../controllers/users.js"

const router = Router();

router.post('/signup', controllers.signUp)
router.post('/signin', controllers.signIn)
router.get('/verify', controllers.verify)
router.get('/getuser/:id', controllers.getUser)
// router.post('/change-password', controllers.changePassword)

export default router;