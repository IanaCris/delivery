import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnsureAuthenticateClientMiddleware } from './middleware/ensureAuthenticateClient.middleware';
import { EnsureAuthenticateDeliverymanMiddleware } from './middleware/ensureAuthenticateDeliveryman.middleware';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { AuthenticateDeliverymanService } from './service/authenticateDeliveryman.service';
import { CreateClientService } from './service/createClient.service';
import { CreateDeliveryService } from './service/createDelivery.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';
import { FindAllDeliveryAvailableService } from './service/findAllDeliveryAvailable.service';
import { UpdateDeliverymanService } from './service/updateDeliveryman.service';

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
    UpdateDeliverymanService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(EnsureAuthenticateClientMiddleware)
      .exclude(
        { path: 'client/authenticate', method: RequestMethod.POST },
        { path: 'deliveryman/authenticate', method: RequestMethod.POST },
      )
      .forRoutes({ path: 'delivery', method: RequestMethod.POST});
      
      consumer.apply(EnsureAuthenticateDeliverymanMiddleware)
      .forRoutes({ path: 'delivery/**', method: RequestMethod.GET });
  }
}
