import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticateClientService } from './domain/client/service/authenticateClient.service';
import { CreateClientService } from './domain/client/service/createClient.service';
import { FindAllDeliveriesService } from './domain/client/service/findAllDeliveries.service';
import { CreateDeliveryService } from './domain/delivery/service/createDelivery.service';
import { FindAllDeliveryAvailableService } from './domain/delivery/service/findAllDeliveryAvailable.service';
import { UpdateDeliverymanService } from './domain/delivery/service/updateDeliveryman.service';
import { AuthenticateDeliverymanService } from './domain/deliveryman/service/authenticateDeliveryman.service';
import { CreateDeliverymanService } from './domain/deliveryman/service/createDeliveryman.service';
import { EnsureAuthenticateClientMiddleware } from './middleware/ensureAuthenticateClient.middleware';
import { EnsureAuthenticateDeliverymanMiddleware } from './middleware/ensureAuthenticateDeliveryman.middleware';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CreateClientService,
    AuthenticateClientService,
    CreateDeliverymanService,
    AuthenticateDeliverymanService,
    CreateDeliveryService,
    FindAllDeliveryAvailableService,
    UpdateDeliverymanService,
    FindAllDeliveriesService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(EnsureAuthenticateClientMiddleware)
      .exclude(
        { path: 'client/authenticate', method: RequestMethod.POST },
        { path: 'deliveryman/authenticate', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'client', method: RequestMethod.POST},
        { path: 'client/deliveries', method: RequestMethod.GET},
        { path: 'deliveryman', method: RequestMethod.POST},
        { path: 'delivery', method: RequestMethod.POST},
      );
      
      consumer.apply(EnsureAuthenticateDeliverymanMiddleware)
      .forRoutes(
        { path: 'delivery/**', method: RequestMethod.GET },
        { path: 'delivery/**', method: RequestMethod.PUT }
      );
  }
}
