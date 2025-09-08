import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';
import { UserCreateData, UserUpdateData } from '../types';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.findAll(skip, limit);
    const total = await this.userRepository.count();
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(userData: UserCreateData) {
    // Check if username already exists
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return user;
  }

  async updateUser(id: number, userData: UserUpdateData) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if username already exists (if username is being updated)
    if (userData.username) {
      const userWithSameUsername = await this.userRepository.findByUsername(userData.username);
      if (userWithSameUsername && userWithSameUsername.id !== id) {
        throw new Error('Username already exists');
      }
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Update user
    const user = await this.userRepository.update(id, userData);
    return user;
  }

  async deleteUser(id: number) {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Delete user
    const user = await this.userRepository.delete(id);
    return user;
  }
}
