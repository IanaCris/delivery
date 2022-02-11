import { prisma } from "src/database/prismaClient";

export class FindAllDeliveriesService {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      }, 
      select: {
        deliveries: true,
        id: true,
        username: true
      }
    });

    return deliveries;
  }
}