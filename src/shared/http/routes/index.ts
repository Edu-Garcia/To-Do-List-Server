import { Router } from 'express';
import { tasksRouter } from '@modules/tasks/routes/tasks.routes';

const routes = Router();

routes.use('/api/tasks', tasksRouter);

export default routes;
