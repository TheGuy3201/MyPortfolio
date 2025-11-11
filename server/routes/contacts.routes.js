import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiter for destructive actions (e.g., DELETE)
const deleteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 delete requests per window
    message: 'Too many delete requests from this IP, please try again later.'
})
router.route('/')
    .post(contactsCtrl.create)  // Anyone can create a contact
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.list)  // Only admin can list contacts

router.route('/:contactId')
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, deleteLimiter, contactsCtrl.remove)

router.param('contactId', contactsCtrl.contactByID)

export default router