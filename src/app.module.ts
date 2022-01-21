import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnsureAuthenticateClientMiddleware } from './middleware/ensureAuthenticateClient.middleware';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { AuthenticateDeliverymanService } from './service/authenticateDeliverymanservice';
import { CreateClientService } from './service/createClient.service';
import { CreateDeliveryService } from './service/createDelivery.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CreateClientService,
    AuthenticateClientService,
    CreateDeliverymanService,
    AuthenticateDeliverymanService,
    CreateDeliveryService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(EnsureAuthenticateClientMiddleware)
      .exclude(
        { path: 'client/authenticate', method: RequestMethod.POST },
        { path: 'deliveryman/authenticate', method: RequestMethod.POST },
      )
      .forRoutes(AppController);
  }
}
