import express from 'express'
import contactsCtrl from '../controllers/contacts.controller.js'
const router = express.Router()
router.route('/api/contacts').post(contactsCtrl.create)
router.route('/api/contacts').get(contactsCtrl.list)
router.param('contactId', contactsCtrl.contactByID)
router.route('/api/contacts/:contactId').get(contactsCtrl.read)
router.route('/api/contacts/:contactId').put(contactsCtrl.update)
router.route('/api/contacts/:contactId').delete(contactsCtrl.remove)
export default router