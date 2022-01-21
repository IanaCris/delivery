import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

@Injectable()
export class EnsureAuthenticateClientMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
      return response.status(410).json({
        message: "Token Missing"
      });
    }

    const [,token] = authHeader.split(" ");

    try {
      const { sub } = verify(token, "1e0fb489cc4e23e43adde0c56c2bc2b0");
      console.log(sub);

      return next();
    } catch (err) {
      return response.status(410).json({
        message: "Invalid Token"
      });
    }
    
  }
}