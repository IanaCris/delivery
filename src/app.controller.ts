import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
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
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async createClientNow(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createClient.execute({ username, password });
  }
}
