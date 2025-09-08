import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthenticatedRequest, ApiResponse } from '../types';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query as any;
      const result = await this.userService.getAllUsers(page, limit);

      const response: ApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: result
      };

      return res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to retrieve users'
      };

      return res.status(500).json(response);
    }
  };

  getUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params as any;
      const user = await this.userService.getUserById(id);

      const response: ApiResponse = {
        success: true,
        message: 'User retrieved successfully',
        data: user
      };

      return res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to retrieve user'
      };

      return res.status(404).json(response);
    }
  };

  createUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);

      const response: ApiResponse = {
        success: true,
        message: 'User created successfully',
        data: user
      };

      return res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to create user'
      };

      return res.status(400).json(response);
    }
  };

  updateUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params as any;
      const user = await this.userService.updateUser(id, req.body);

      const response: ApiResponse = {
        success: true,
        message: 'User updated successfully',
        data: user
      };

      return res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to update user'
      };

      return res.status(400).json(response);
    }
  };

  deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params as any;
      const user = await this.userService.deleteUser(id);

      const response: ApiResponse = {
        success: true,
        message: 'User deleted successfully',
        data: user
      };

      return res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to delete user'
      };

      return res.status(404).json(response);
    }
  };
}
