import { prisma } from '@/lib/db/prisma';

// CREATE
export async function createTodo(data: {
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: string;
}) {
  return await prisma.todo.create({
    data
  });
}

// GET ALL
export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

// GET BY USER
export async function getUserTodos(userId: string) {
  return await prisma.todo.findMany({
    where: { userId }
  });
}

// UPDATE
export async function updateTodo(id: string, data: any) {
  return await prisma.todo.update({
    where: { id },
    data
  });
}

// DELETE
export async function deleteTodo(id: string) {
  return await prisma.todo.delete({
    where: { id }
  });
}