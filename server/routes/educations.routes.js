import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
  .get(educationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.create)

router.route('/:educationId')
  .get(educationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.remove)

router.param('educationId', educationCtrl.educationByID)

export default router