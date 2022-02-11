import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { CreateClientService } from './service/createClient.service';
import { FindAllDeliveriesService } from './service/findAllDeliveries.service';

@Module({
  controllers: [ClientController],
  providers: [
    CreateClientService,
    AuthenticateClientService,
    FindAllDeliveriesService,
  ],
})
export class ClientModule {}