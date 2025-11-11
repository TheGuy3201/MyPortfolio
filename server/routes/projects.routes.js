import express from 'express';
import projectCtrl from '../controllers/projects.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import { readLimiter, adminLimiter, deleteLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(adminLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.create)
  .get(readLimiter, projectCtrl.list);

router.route('/:projectId')
  .get(readLimiter, projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, adminLimiter, projectCtrl.update)
  .delete(deleteLimiter, authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.remove);

// Middleware to fetch project by ID
router.param('projectId', projectCtrl.projectByID);

export default router;