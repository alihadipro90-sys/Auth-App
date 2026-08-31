import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { createUser, deleteUser, listUsers, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.use(userAuth);
userRouter.use(requireAdmin);
userRouter.get('/', listUsers);
userRouter.post('/', createUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;