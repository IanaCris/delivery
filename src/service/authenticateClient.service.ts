import { prisma } from '../database/prismaClient';
import { compare } from "bcrypt";
import { Injectable } from '@nestjs/common';
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticateClientService {
  async execute({ username, password }: IAuthenticateClient) {
    
    //verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!client) {
      throw new Error("Username or password invalid1!");
    }
    
    //verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch) {
      throw new Error("Username or password invalid2!");
    }

    //gerar o token
    const token = sign({username},"1e0fb489cc4e23e43adde0c56c2bc2b0", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}