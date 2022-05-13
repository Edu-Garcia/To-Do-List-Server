import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const taskService = new TaskService();

    const tasks = await taskService.listTaskService();

    return response.json(tasks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const taskService = new TaskService();

    const task = await taskService.createTaskService({ title, description });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id } = request.params;

    const taskService = new TaskService();

    const task = await taskService.updateTaskService({
      id,
      title,
      description,
    });

    return response.json(task);
  }

  public async complete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const taskService = new TaskService();

    const task = await taskService.completeTaskService({ id });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const taskService = new TaskService();

    const task = await taskService.deleteTaskService({ id });

    return response.json({ message: task });
  }

  public async deleteAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const taskService = new TaskService();

    const task = await taskService.deleteAllTasksService();

    return response.json({ message: task });
  }
}
