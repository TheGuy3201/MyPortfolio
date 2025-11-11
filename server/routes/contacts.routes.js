import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { contactLimiter, readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js'
import { validateContactInput } from '../middleware/validation.js'

const router = express.Router()

router.route('/')
  .post(contactLimiter, validateContactInput, contactsCtrl.create)  // Strict limit on contact submissions to prevent spam
  .get(readLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.list)  // Only admin can list contacts

router.route('/:contactId')
  .get(readLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.read)
  .put(adminLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, deleteLimiter, contactsCtrl.remove)

router.param('contactId', contactsCtrl.contactByID)

export default router