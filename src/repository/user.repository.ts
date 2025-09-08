import { User } from '@prisma/client';
import prisma from '../utils/prisma';
import { UserCreateData, UserUpdateData } from '../types';

export class UserRepository {
  async findAll(skip: number = 0, take: number = 10) {
    return await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username }
    });
  }

  async create(data: UserCreateData) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }

  async update(id: number, data: UserUpdateData){
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }

  async delete(id: number){
    return await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }

  async count(): Promise<number> {
    return await prisma.user.count();
  }
}
