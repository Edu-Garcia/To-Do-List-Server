import { Request, Response } from 'express';
import { UserService } from 'src/services/user.service';

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userService = new UserService();

    const user = await userService.listUserService(id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = new UserService();

    const user = await userService.createUserService({ name, email, password });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password } = request.body;

    const userService = new UserService();

    const user = await userService.updateUserService({
      id,
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userService = new UserService();

    const user = await userService.deleteUserService(id);

    return response.json({ message: user });
  }
}
