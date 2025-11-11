import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import rateLimit from 'express-rate-limit'

// Apply a strict rate limit to the /signin endpoint to prevent brute-force attacks
const signinLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 5 minutes'
})

const router = express.Router()

router.route('/signin')
  .post(signinLimiter, authCtrl.signin)

router.route('/signout')
  .get(authCtrl.signout)

export default router