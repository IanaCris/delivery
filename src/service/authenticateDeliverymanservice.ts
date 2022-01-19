import { prisma } from '../database/prismaClient';
import { compare } from "bcrypt";
import { Injectable } from '@nestjs/common';
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticateDeliverymanService {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if(!deliveryman) {
      throw new Error("Username or password invalid1!");
    }
    
    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch) {
      throw new Error("Username or password invalid2!");
    }

    const token = sign({username},"1e0fb489cc4e65e43adde0c56c2bc2b0", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}