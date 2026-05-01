// FILE: lib/services/user.service.ts

import { prisma } from '@/lib/db-instance/prisma'

// CREATE
export async function createUser(data: {
    id: string;
    username: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    jobType: string;
    hobbies: string[];
    password: string | null;
    role: string;
    resetToken: string | null;
    resetTokenExpiry: Date | null;
    createdAt: Date;
    updatedAt: Date;
}) {
  return await prisma.user.create({
    data
  });
}

// GET ALL
export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      gender: true,
      jobType: true,
      hobbies: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getAllUsersSpecificData(fields: string[]) {
  return await prisma.user.findMany({
    select: Object.fromEntries(fields.map((field) => [field, true]))
  });

}

export async function getUsersForDropdown() {
  return prisma.user.findMany({
    where: {
      role: 'USER', // 🔥 exclude admin
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: {
      firstName: 'asc',
    },
  });
}

// GET BY USER
export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username: username },
    include: {
      todos: true, //  REQUIRED
    },
  });
}


// UPDATE
export async function updateUser(id: string, data: any) {
  return await prisma.user.update({
    where: { id },
    data
  });
}

// DELETE
export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id }
  });
}