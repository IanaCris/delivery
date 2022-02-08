import { prisma } from "src/database/prismaClient";

export class FindAllDeliveriesService {
  async execute(id_client: string) {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client
      }, 
      include: {
        Deliveries: true
      }
    });

    return deliveries;
  }
}