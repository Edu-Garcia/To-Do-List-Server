import { Request, Response } from 'express';
import { CreateTaskService } from '../services/CreateTaskService';
import { ListTaskService } from '../services/ListTaskService';
import { UpdateTaskService } from '../services/UpdateTaskService';
import { CompleteTaskService } from '../services/CompleteTaskService';
import { DeleteTaskService } from '../services/DeleteTaskService';

export class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTasks = new ListTaskService();

    const tasks = await listTasks.execute();

    return response.json(tasks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createTask = new CreateTaskService();

    const task = await createTask.execute({ title, description });

    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id } = request.params;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({ id, title, description });

    return response.json(task);
  }

  public async complete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const completeTask = new CompleteTaskService();

    const task = await completeTask.execute({ id });

    return response.json(task);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTask = new DeleteTaskService();

    const task = await deleteTask.execute({ id });

    return response.json({ message: task });
  }
}
