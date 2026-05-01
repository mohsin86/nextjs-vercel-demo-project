/*
-------------

***Final architecture****
Defines models = schema.prisma
Creates reusable Prisma instance = lib/db-instance/prisma.ts

**API routes/servicea use the reusable instance**
- app/api/register/route.ts
- app/api/forgot-password/route.ts
- lib/db/services/todos.service.ts
Use:
import { prisma } from '@/lib/db-instance/prisma'

--------
*/

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}