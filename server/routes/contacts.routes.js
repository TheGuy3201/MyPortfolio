import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
    .post(contactsCtrl.create)  // Anyone can create a contact
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.list)  // Only admin can list contacts

router.route('/:contactId')
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, contactsCtrl.remove)

router.param('contactId', contactsCtrl.contactByID)

export default router