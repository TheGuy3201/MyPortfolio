import express from 'express'
import educationCtrl from '../controllers/educations.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import rateLimit from 'express-rate-limit'

// Limit to 10 create requests per 15 minutes per IP (admins only)
const createEducationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many education create requests from this IP, please try again after 15 minutes.'
});

// Limit to 5 delete requests per 15 minutes per IP (admins only)
const deleteEducationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many education delete requests from this IP, please try again after 15 minutes.'
});

const router = express.Router()

router.route('/')
  .get(educationCtrl.list)
  .post(
    createEducationLimiter,
    authCtrl.requireSignin, 
    authCtrl.requireAdmin, 
    educationCtrl.create
  )

router.route('/:educationId')
  .get(educationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, educationCtrl.update)
  .delete(
    deleteEducationLimiter,
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    educationCtrl.remove
  )

router.param('educationId', educationCtrl.educationByID)

export default router