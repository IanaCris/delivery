import { prisma } from '../database/prismaClient';
import { compare } from "bcrypt";
import { Injectable } from '@nestjs/common';
import { sign } from "jsonwebtoken";

interface IAutheticateClient {
  username: string;
  password: string;
}

@Injectable()
export class AutheticateUserService {
  async execute({ username, password }: IAutheticateClient) {
    
    //verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!client) {
      throw new Error("Username or password invalid!");
    }
    
    //verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    //gerar o token
    const token = sign({username},"1e0fb489cc4e23e43adde0c56c2bc2b0", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}