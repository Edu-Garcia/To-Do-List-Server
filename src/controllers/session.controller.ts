import { Request, Response } from 'express';
import { SessionService } from 'src/services/session.service';
import { container } from 'tsyringe';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionService = container.resolve(SessionService);

    const user = await sessionService.createSessionService({ email, password });

    return response.json(user);
  }
}
