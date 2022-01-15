import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { CreateClientService } from './service/createClient.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    CreateClientService,
    AuthenticateClientService
  ],
})
export class AppModule {}
