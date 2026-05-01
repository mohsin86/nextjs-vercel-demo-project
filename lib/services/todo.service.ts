// File: lib/services/todo.service.ts

import { prisma } from '@/lib/db-instance/prisma';
//import { Prisma } from '@prisma/client';
import { Priority } from '@prisma/client'

// CREATE
export async function createTodo(data: {
  title: string;
  description?: string;
  priority: Priority;
  userId: string;
}) {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      userId: data.userId,
    },
  });
}

// GET ALL
export async function getTodos() {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}

// GET BY USER
export async function getUserTodos(userId: string) {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// UPDATE

export async function updateTodo(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    priority: Priority;
    completed: boolean;
    userId: string;
  }>
) {
  // const updateData: any = {};
  //   if (data.title !== undefined) updateData.title = data.title;
  // if (data.description !== undefined) updateData.description = data.description;
  // if (data.priority !== undefined) updateData.priority = data.priority;
  // if (data.completed !== undefined) updateData.completed = data.completed;
  // if (data.userId !== undefined) updateData.userId = data.userId;

  return prisma.todo.update({
    where: { id },
    data: {
      // conditionally include only provided fields
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.completed !== undefined && { completed: data.completed }),
      ...(data.userId !== undefined && { userId: data.userId }),
    },
  });
}

// DELETE
export async function deleteTodo(id: string) {
  return prisma.todo.delete({
    where: { id },
  });
}