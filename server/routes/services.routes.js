import express from 'express'
import servicesCtrl from '../controllers/services.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .get(servicesCtrl.list)  // Public can view active services
    .post(authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.create)  // Only admin can create

router.route('/all')
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.listAll)  // Only admin can view all services

router.route('/:serviceId')
    .get(servicesCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, servicesCtrl.remove)

router.param('serviceId', servicesCtrl.serviceByID)

export default router
