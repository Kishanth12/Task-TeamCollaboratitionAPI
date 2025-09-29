import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, updateUserRole } from '../controllers/userController.js';

const router = express.Router();

router.get('/users',getAllUsers);
router.get('/user/:id',getSingleUser);
router.patch('/user/:id',updateUserRole);
router.delete('/user/:id',deleteUser); 

export default router;