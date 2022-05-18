import { Router } from 'express';
import { sessionsRouter } from './sessions.routes';
import { tasksRouter } from './tasks.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/api/tasks', tasksRouter);
routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionsRouter);

export { routes };
