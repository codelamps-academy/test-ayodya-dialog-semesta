import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiResponse } from '../types';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        errors: error.errors || error.message
      };
      return res.status(400).json(response);
    }
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        errors: error.errors || error.message
      };
      return res.status(400).json(response);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        errors: error.errors || error.message
      };
      return res.status(400).json(response);
    }
  };
};
