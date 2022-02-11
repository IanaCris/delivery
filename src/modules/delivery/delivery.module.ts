import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { CreateDeliveryService } from './service/createDelivery.service';
import { FindAllDeliveryAvailableService } from './service/findAllDeliveryAvailable.service';
import { UpdateDeliverymanService } from './service/updateDeliveryman.service';

@Module({
  controllers: [DeliveryController],
  providers: [
    CreateDeliveryService,
    FindAllDeliveryAvailableService,
    UpdateDeliverymanService,
  ],
})
export class DeliveryModule {}