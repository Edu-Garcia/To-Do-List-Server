import { Request, Response } from 'express';
import { SessionService } from 'src/services/session.service';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionService = new SessionService();

    const user = await sessionService.createSessionService({ email, password });

    return response.json(user);
  }
}
