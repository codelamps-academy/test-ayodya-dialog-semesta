import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middleware/validation.middleware';
import { createUserSchema, updateUserSchema, getUserParamsSchema, getPaginationSchema } from '../schema/user.schema';

const router = Router();
const userController = new UserController();

// Apply authentication middleware to all routes
router.use(authenticateToken);

router.get('/', validateQuery(getPaginationSchema), userController.getAllUsers);
router.get('/:id', validateParams(getUserParamsSchema), userController.getUserById);
router.post('/', validateBody(createUserSchema), userController.createUser);
router.patch('/:id', validateParams(getUserParamsSchema), validateBody(updateUserSchema), userController.updateUser);
router.delete('/:id', validateParams(getUserParamsSchema), userController.deleteUser);

export default router;
