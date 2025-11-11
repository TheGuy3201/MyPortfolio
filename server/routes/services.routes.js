import express from 'express'
import servicesCtrl from '../controllers/services.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import rateLimit from 'express-rate-limit'

// Limit admin actions to 10 requests per minute
const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});
const router = express.Router()

router.route('/')
    .get(servicesCtrl.list)  // Public can view active services
    .post(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, servicesCtrl.create)  // Only admin can create

router.route('/all')
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.listAll)  // Only admin can view all services

router.route('/:serviceId')
    .get(servicesCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, servicesCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, servicesCtrl.remove)

router.param('serviceId', servicesCtrl.serviceByID)

export default router
