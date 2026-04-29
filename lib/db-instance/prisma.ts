/*
-------------

***Final architecture****
Defines models = schema.prisma
Defines DB connection = prisma.config.ts (I have deleted it for now since it is not needed with prisma 5.0+)

Creates reusable Prisma instance = lib/db-instance/prisma.ts

**API routes/servicea use the reusable instance**
- app/api/register/route.ts
- app/api/forgot-password/route.ts
- lib/db/services/todos.service.ts
Use:
import { prisma } from '@/lib/db-instance/prisma'

--------
*/

import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}