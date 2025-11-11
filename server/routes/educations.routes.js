import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.route('/')
  .get(readLimiter, educationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, educationCtrl.create)

router.route('/:educationId')
  .get(readLimiter, educationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, educationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, deleteLimiter, educationCtrl.remove)

router.param('educationId', educationCtrl.educationByID)

export default router