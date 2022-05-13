import { Router } from 'express';
import { TasksController } from '../controllers/task.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.index);

tasksRouter.post(
  '/',
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
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string(),
      description: Joi.string(),
    },
  }),
  tasksController.update,
);

tasksRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.complete,
);

tasksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.delete,
);

tasksRouter.delete('/', tasksController.deleteAll);

export { tasksRouter };
