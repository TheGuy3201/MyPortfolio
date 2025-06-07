import express from 'express';
import userCtrl from '../controllers/projects.controller.js';

const router = express.Router();

router.route('/')
    .post(userCtrl.create)
    .get(userCtrl.list);

router.post('/', userCtrl.create);

router.route('/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

// Middleware to fetch user by ID
router.param('userId', userCtrl.userByID);

export default router;