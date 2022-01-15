import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { CreateClientService } from './service/createClient.service';

interface CreateClientDto {
  username: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly createClient: CreateClientService,
    private readonly authenticateClient: AuthenticateClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("client")
  async createClientNow(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createClient.execute({ username, password });
  }
  @Post("authenticate")
  async authenticateClientNow(@Body() { username, password }: CreateClientDto): Promise<string> {
    console.log({ username, password });
    return await this.authenticateClient.execute({ username, password });
  }
}
