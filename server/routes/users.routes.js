import express from 'express'
import userCtrl from '../controllers/users.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import rateLimit from 'express-rate-limit'

// Set up rate limiter for GET /users requests
const getUsersLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the headers
  legacyHeaders: false, // Disable the X-RateLimit headers
})

const router = express.Router()
router.route('/')
.get(getUsersLimiter, userCtrl.list)
.post(userCtrl.create)
router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.param('userId', userCtrl.userByID)
export default router