import { prisma } from "src/database/prismaClient";

export class FindAllDeliveryAvailable {
  async execute() {
      const deliveries = await prisma.deliveries.findMany({
        where: {
          end_at: null
        }
      });

      return deliveries;
  }
}