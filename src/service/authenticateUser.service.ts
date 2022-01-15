import { prisma } from '../database/prismaClient';
import { Injectable } from '@nestjs/common';

interface IAutheticateClient {
  username: string;
  password: string;
}

@Injectable()
export class AutheticateUserService {
  async execute({ username, password }: IAutheticateClient) {
  
    //receber username, password
  
    //verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });
    
    //verificar se senha corresponde ao username
  
    //gerar o token
  }
}