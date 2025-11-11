import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Apply strict rate limiting to signin to prevent brute-force attacks
router.route('/signin')
  .post(authLimiter, authCtrl.signin)

// Signout doesn't need rate limiting as it's not a security risk
router.route('/signout')
  .get(authCtrl.signout)

export default router