import { hash } from "bcrypt";
import { Injectable } from '@nestjs/common';
import { prisma } from "src/database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

@Injectable()
export class CreateClientService {
  async execute({ username, password }: ICreateClient) {
    //validar o client exists
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (clientExist) {
      throw new Error('Client already exists');
    }

    //criptografar a senha
    const hashPassword = await hash(password, 10);

    //salvar o client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      }
    });

    return client;
  }
}
