import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../types';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'User registered successfully',
        data: user
      };

      return res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Registration failed'
      };

      return res.status(400).json(response);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: result
      };

      return res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Login failed'
      };

      return res.status(401).json(response);
    }
  };
}
