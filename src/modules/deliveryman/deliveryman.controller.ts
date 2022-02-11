import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthenticateDeliverymanService } from './service/authenticateDeliveryman.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';
import { Request, Response } from 'express';
import { FindAllDeliveriesService } from './service/findAllDeliveries.service';

interface DeliverymanDto {
  username: string;
  password: string;
}

@Controller('deliveryman')
export class DeliverymanController {
  constructor(
    private readonly createDeliveryman: CreateDeliverymanService,
    private readonly authenticateDeliveryman: AuthenticateDeliverymanService,  
    private readonly findAllDeliveriesService: FindAllDeliveriesService,  
  ) {}

  @Post("/")
  async create(@Body() { username, password }: DeliverymanDto): Promise<void> {
    //console.log({ username, password });
    await this.createDeliveryman.execute({ username, password });
  }

  @Post("/authenticate")
  async authenticate(@Res() response: Response, @Body() { username, password }: DeliverymanDto): Promise<any> {
    const token = await this.authenticateDeliveryman.execute({ username, password });    
    return response.status(200).json(token);
  }

  @Get("/deliveries")
  async deliveryClient(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_deliveryman } = request;
    const deliveries = await this.findAllDeliveriesService.execute(id_deliveryman);
    
    return response.status(200).json(deliveries);
  }
}