import { PrismaClient } from "@prisma/client";

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

const createPrismaClient = () =>
  new PrismaClient();

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

const db = globalForPrisma.prisma ?? createPrismaClient();

if (!isProd) globalForPrisma.prisma = db;

export default db;
