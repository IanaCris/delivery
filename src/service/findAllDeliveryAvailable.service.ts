import { prisma } from "src/database/prismaClient";

export class FindAllDeliveryAvailableService {
  async execute() {
      const deliveries = await prisma.deliveries.findMany({
        where: {
          end_at: null,
          id_deliveryman: null,
        }
      });

      return deliveries;
  }
}