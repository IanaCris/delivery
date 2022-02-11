import { Module } from '@nestjs/common';
import { DeliverymanController } from './deliveryman.controller';
import { AuthenticateDeliverymanService } from './service/authenticateDeliveryman.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';
import { FindAllDeliveriesService } from './service/findAllDeliveries.service';

@Module({
  controllers: [DeliverymanController],
  providers: [
    AuthenticateDeliverymanService,
    CreateDeliverymanService,
    FindAllDeliveriesService,
  ],
})
export class DeliverymanModule {}