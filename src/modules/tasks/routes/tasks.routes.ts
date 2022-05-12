import { Router } from 'express';
import { TasksController } from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.index);
tasksRouter.post('/', tasksController.create);
tasksRouter.put('/:id', tasksController.update);
tasksRouter.patch('/:id', tasksController.complete);
tasksRouter.delete('/:id', tasksController.delete);

export { tasksRouter };
