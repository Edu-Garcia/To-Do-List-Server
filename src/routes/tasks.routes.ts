import { Router } from 'express';
import { TasksController } from '../controllers/task.controller';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from 'src/middlewares/isAuthenticated';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', isAuthenticated, tasksController.index);

tasksRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  tasksController.create,
);

tasksRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      title: Joi.string(),
      description: Joi.string(),
    },
  }),
  tasksController.update,
);

tasksRouter.patch(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  tasksController.complete,
);

tasksRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  tasksController.delete,
);

tasksRouter.delete('/', isAuthenticated, tasksController.deleteAll);

export { tasksRouter };
