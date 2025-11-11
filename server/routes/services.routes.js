import express from 'express'
import servicesCtrl from '../controllers/services.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.route('/')
  .get(readLimiter, servicesCtrl.list)  // Public can view active services
  .post(authCtrl.requireSignin, adminLimiter, authCtrl.requireAdmin, servicesCtrl.create)  // Only admin can create

router.route('/all')
  .get(readLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.listAll)  // Only admin can view all services

router.route('/:serviceId')
  .get(readLimiter, servicesCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, servicesCtrl.update)
  .delete(deleteLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.remove)

router.param('serviceId', servicesCtrl.serviceByID)

export default router
