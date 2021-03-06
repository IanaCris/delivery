import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EnsureAuthenticateClientMiddleware } from './middleware/ensureAuthenticateClient.middleware';
import { EnsureAuthenticateDeliverymanMiddleware } from './middleware/ensureAuthenticateDeliveryman.middleware';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { DeliverymanModule } from './modules/deliveryman/deliveryman.module';
import { ClientModule } from './modules/client/client.module';


@Module({
  imports: [
    DeliveryModule,
    DeliverymanModule,
    ClientModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(EnsureAuthenticateClientMiddleware)
      .exclude(
        { path: 'client/authenticate', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'client/**', method: RequestMethod.POST},
        { path: 'client', method: RequestMethod.GET},
        { path: 'client/**', method: RequestMethod.GET},
        { path: 'delivery', method: RequestMethod.POST},
      );
      
      consumer.apply(EnsureAuthenticateDeliverymanMiddleware)
      .exclude(
        { path: 'deliveryman/authenticate', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'delivery/**', method: RequestMethod.GET },
        { path: 'delivery/**', method: RequestMethod.PUT },
        { path: 'deliveryman/**', method: RequestMethod.GET },
      );
  }
}
