import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateDeliveryService } from './service/createDelivery.service';
import { FindAllDeliveryAvailableService } from './service/findAllDeliveryAvailable.service';
import { UpdateDeliverymanService } from './service/updateDeliveryman.service';
import { UpdateEndDateService } from './service/updateEndDate.service';

@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly createDelivery: CreateDeliveryService,
    private readonly findAllDeliveriesAvailable: FindAllDeliveryAvailableService,
    private readonly updateDelivery: UpdateDeliverymanService,    
    private readonly updateEndDateDelivery: UpdateEndDateService,    
  ) {}

  @Post("/")
  async createDeliveryNow(@Req() request: Request, @Res() response: Response, @Body() bodyRequest: ICreateDeliveryDTO ): Promise<any> {
    const { id_client } = request;
    const delivery = await this.createDelivery.execute({ item_name: bodyRequest.item_name, id_client });
    return response.status(200).json(delivery);
  }
  
  @Put("/updateDeliveryman/:id")
  async updateDeliveryNow(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const delivery = await this.updateDelivery.execute({ id_delivery, id_deliveryman });
    return response.status(200).json(delivery);
  }

  @Put("/updateEndDate/:id")
  async updateEndDate(@Req() request: Request, @Res() response: Response): Promise<any> {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const delivery = await this.updateEndDateDelivery.execute({ id_delivery, id_deliveryman });
    return response.status(200).json(delivery);
  }
  
  @Get("/available")
  async deliveryAvailable(@Res() response: Response): Promise<any> {
    const deliveries = await this.findAllDeliveriesAvailable.execute();
    
    return response.status(200).json(deliveries);
  }
}