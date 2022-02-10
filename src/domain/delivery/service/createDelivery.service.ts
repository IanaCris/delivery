import { Injectable } from "@nestjs/common";
import { prisma } from "src/database/prismaClient";

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

@Injectable()
export class CreateDeliveryService {
  async execute({ item_name, id_client }: ICreateDelivery) {
    const delivery = await prisma.deliveries.create({
      data:{
        item_name,
        id_client
      }
    });

    return delivery;
  }
}