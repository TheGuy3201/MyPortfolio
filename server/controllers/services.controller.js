import Service from '../models/services.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    const service = new Service(req.body)
    try {
        await service.save()
        return res.status(200).json({
            message: "Successfully created service!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let services = await Service.find({ isActive: true }).sort({ order: 1 })
        res.json(services)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listAll = async (req, res) => {
    try {
        let services = await Service.find().sort({ order: 1 })
        res.json(services)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const serviceByID = async (req, res, next, id) => {
    try {
        let service = await Service.findById(id)
        if (!service)
            return res.status(400).json({
                error: "Service not found"
            })
        req.profile = service
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve service"
        })
    }
}

const read = (req, res) => {
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let service = req.profile
        service = extend(service, req.body)
        await service.save()
        res.json(service)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let service = req.profile
        let deletedService = await service.deleteOne()
        res.json(deletedService)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, serviceByID, read, list, listAll, remove, update }
