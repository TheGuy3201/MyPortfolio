import Education from '../models/educations.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
export const create = async (req, res) => {
    console.log(req.body); // Log the incoming data
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: err.message });
    }
};
const list = async (req, res) => {
    try {
        let education = await Education.find().select('institution degree graddate accomplishments courses')
        res.json(education)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
        })
    }
}
    const educationByID = async (req, res, next, id) => {
    try {
        let education = await Education.findById(id)
        if (!education)
            return res.status('400').json({
                error: "Education history not found"
        })
        req.profile = education
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve education history"
        })
    }
}
const read = (req, res) => {
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res) => {
    try {
        let education = req.profile
        education = extend(education, req.body)
        await education.save()
        education.salt = undefined
        res.json(education)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let education = req.profile
        let deletedEducation = await education.deleteOne()
        deletedEducation.salt = undefined
        res.json(deletedEducation)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
export default { create, educationByID, read, list, remove, update }