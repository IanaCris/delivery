import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { CreateClientService } from './service/createClient.service';
import { FindAllDeliveriesService } from './service/findAllDeliveries.service';


interface CreateClientDto {
  username: string;
  password: string;
}

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClient: CreateClientService,
    private readonly authenticateClient: AuthenticateClientService,
    private readonly FindAllDeliveriesClient: FindAllDeliveriesService,
  ) {}

  @Post("/")
  async createClientNow(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createClient.execute({ username, password });
  }

  @Post("/authenticate")
  async authenticateClientNow(@Res() response: Response, @Body() { username, password }: CreateClientDto): Promise<any> {     
    const token = await this.authenticateClient.execute({ username, password });
    return response.status(200).json(token);
  }

  @Get("/deliveries")
  async deliveryClient(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_client } = request;
    const deliveries = await this.FindAllDeliveriesClient.execute(id_client);
    
    return response.status(200).json(deliveries);
  }
}