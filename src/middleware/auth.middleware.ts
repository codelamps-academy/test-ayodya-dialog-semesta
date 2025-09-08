import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest, ApiResponse } from '../types';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const response: ApiResponse = {
      success: false,
      message: 'Access token is required'
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Invalid or expired token'
    };
    return res.status(403).json(response);
  }
};
