import express from 'express';
import projectCtrl from '../controllers/projects.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/')
    .post(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.create)
    .get(projectCtrl.list);

router.route('/:projectId')
    .get(projectCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.remove);

// Middleware to fetch project by ID
router.param('projectId', projectCtrl.projectByID);

export default router;