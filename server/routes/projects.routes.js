import express from 'express';
import projectCtrl from '../controllers/projects.controller.js';

const router = express.Router();

router.route('/')
    .post(projectCtrl.create)
    .get(projectCtrl.list);

router.post('/', projectCtrl.create);

router.route('/:projectId')
    .get(projectCtrl.read)
    .put(projectCtrl.update)
    .delete(projectCtrl.remove);

// Middleware to fetch project by ID
router.param('projectId', projectCtrl.projectByID);

export default router;