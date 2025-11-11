import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.route('/')
  .get(readLimiter, educationCtrl.list)
  .post(adminLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.create)

router.route('/:educationId')
  .get(readLimiter, educationCtrl.read)
  .put(adminLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.update)
  .delete(deleteLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.remove)

router.param('educationId', educationCtrl.educationByID)

export default router