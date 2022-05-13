import { Router } from 'express';
import { tasksRouter } from './tasks.routes';

const routes = Router();

routes.use('/api/tasks', tasksRouter);

export default routes;
