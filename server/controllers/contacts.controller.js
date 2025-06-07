import Contact from '../models/contacts.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => {
    const contact = new Contact(req.body)
    try {
        await contact.save()
        return res.status(200).json({
            message: "Successfully registered contact!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        let contacts = await Contact.find().select('name email updated created')
        res.json(contacts)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
        })
    }
}
    const contactByID = async (req, res, next, id) => {
    try {
            let contact = await Contact.findById(id)
            if (!contact)
                return res.status('400').json({
                    error: "Contact not found"
            })
            req.profile = contact
            next()
        } catch (err) {
            return res.status('400').json({
                error: "Could not retrieve contact"
            })
        }
}
const read = (req, res) => {
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res) => {
    try {
        let contact = req.profile
        contact = extend(contact, req.body)
        await contact.save()
        contact.salt = undefined
        res.json(contact)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let contact = req.profile
        let deletedContact = await contact.deleteOne()
        deletedContact.salt = undefined
        res.json(deletedContact)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default { create, contactByID, read, list, remove, update }