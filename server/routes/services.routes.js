import express from 'express'
import servicesCtrl from '../controllers/services.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

router.route('/')
  .get(readLimiter, servicesCtrl.list)  // Public can view active services
  .post(authCtrl.requireSignin, adminLimiter, authCtrl.requireAdmin, servicesCtrl.create)  // Only admin can create

router.route('/all')
  .get(authCtrl.requireSignin, authCtrl.requireAdmin, readLimiter, servicesCtrl.listAll)  // Only admin can view all services

router.route('/:serviceId')
  .get(readLimiter, servicesCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, servicesCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, deleteLimiter, servicesCtrl.remove)

router.param('serviceId', servicesCtrl.serviceByID)

export default router
