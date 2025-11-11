import express from 'express'
import userCtrl from '../controllers/users.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { readLimiter, createUserLimiter, writeLimiter, deleteLimiter } from '../middleware/rateLimiter.js'
import { validateUserInput } from '../middleware/validation.js'

const router = express.Router()

router.route('/')
  .get(readLimiter, userCtrl.list)
  .post(createUserLimiter, validateUserInput, userCtrl.create) // Strict limit on user creation with validation

router.route('/:userId')
  .get(authCtrl.requireSignin, readLimiter, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, writeLimiter, validateUserInput, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, deleteLimiter, userCtrl.remove)

router.param('userId', readLimiter, userCtrl.userByID)

export default router