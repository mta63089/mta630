import { PrismaClient } from "../../generated/prisma-client"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
