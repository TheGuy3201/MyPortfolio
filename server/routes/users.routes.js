import express from 'express'
import userCtrl from '../controllers/users.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()
router.route('/')
.get(userCtrl.list)
.post(userCtrl.create)
router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.param('userId', userCtrl.userByID)
export default router