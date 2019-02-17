import {UserController} from './../controllers/user.controller';
import {UserValidator} from './../validators/user.validator';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/sign', UserValidator.validateAuthUser, UserController.signUser);
userRoutes.get('/profile-data', UserValidator.validateAuthUser, UserController.signUser);
export { userRoutes }