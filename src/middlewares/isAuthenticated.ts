import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { authConfig } from 'src/config/auth';
import { ApiError } from 'src/utils/apiErrors.util';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApiError('Autenticação inválida!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new ApiError('Autenticação inválida!', 401);
  }
}
