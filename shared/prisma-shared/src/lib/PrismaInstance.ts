import { PrismaClient } from '@prisma/client';

class PrismaInstance {
  private static instance: PrismaClient;

  private constructor() {
    // Private constructor to prevent instantiation from outside
  }

  public static getInstance(): PrismaClient {
    if (!PrismaInstance.instance) {
      PrismaInstance.instance = new PrismaClient();
    }
    return PrismaInstance.instance;
  }
}

export default PrismaInstance;
