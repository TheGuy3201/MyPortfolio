import express from 'express';
import projectCtrl from '../controllers/projects.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const router = express.Router();

// Apply rate limiter to all routes in this router
router.use(limiter);

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