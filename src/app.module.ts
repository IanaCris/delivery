import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { CreateClientService } from './service/createClient.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CreateClientService,
    AuthenticateClientService,
    CreateDeliverymanService
  ],
})
export class AppModule {}
