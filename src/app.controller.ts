import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { AuthenticateDeliverymanService } from './service/authenticateDeliveryman.service';
import { CreateClientService } from './service/createClient.service';
import { CreateDeliveryService } from './service/createDelivery.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';
import { FindAllDeliveriesService } from './service/findAllDeliveries.service';
import { FindAllDeliveryAvailableService } from './service/findAllDeliveryAvailable.service';
import { UpdateDeliverymanService } from './service/updateDeliveryman.service';

interface CreateClientDto {
  username: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly createClient: CreateClientService,
    private readonly authenticateClient: AuthenticateClientService,
    private readonly createDeliveryman: CreateDeliverymanService,
    private readonly authenticateDeliveryman: AuthenticateDeliverymanService,
    private readonly createDelivery: CreateDeliveryService,
    private readonly findAllDeliveriesAvailable: FindAllDeliveryAvailableService,
    private readonly updateDelivery: UpdateDeliverymanService,
    private readonly FindAllDeliveriesClient: FindAllDeliveriesService,
  ) {}

  @Post("client")
  async createClientNow(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createClient.execute({ username, password });
  }

  @Post("deliveryman")
  async create(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createDeliveryman.execute({ username, password });
  }

  @Post("client/authenticate")
  async authenticateClientNow(@Res() response: Response, @Body() { username, password }: CreateClientDto): Promise<any> {     
    const token = await this.authenticateClient.execute({ username, password });
    return response.status(200).json(token);
  }

  @Post("deliveryman/authenticate")
  async authenticate(@Res() response: Response, @Body() { username, password }: CreateClientDto): Promise<any> {
    const token = await this.authenticateDeliveryman.execute({ username, password });    
    return response.status(200).json(token);
  }
  
  @Post("delivery")
  async createDeliveryNow(@Req() request: Request, @Res() response: Response, @Body() bodyRequest: ICreateDeliveryDTO ): Promise<any> {
    const { id_client } = request;
    const delivery = await this.createDelivery.execute({ item_name: bodyRequest.item_name, id_client });
    return response.status(200).json(delivery);
  }
  
  @Put("delivery/updateDeliveryman/:id")
  async updateDeliveryNow(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const delivery = await this.updateDelivery.execute({ id_delivery, id_deliveryman });
    return response.status(200).json(delivery);
  }
  
  @Get("client/deliveries")
  async deliveryClient(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_client } = request;
    const deliveries = await this.FindAllDeliveriesClient.execute(id_client);
    
    return response.status(200).json(deliveries);
  }
  
  @Get("delivery/available")
  async deliveryAvailable(@Res() response: Response): Promise<any> {
    const deliveries = await this.findAllDeliveriesAvailable.execute();
    
    return response.status(200).json(deliveries);
  }
}
