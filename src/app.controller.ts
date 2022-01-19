import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateClientService } from './service/authenticateClient.service';
import { AuthenticateDeliverymanService } from './service/authenticateDeliverymanservice';
import { CreateClientService } from './service/createClient.service';
import { CreateDeliverymanService } from './service/createDeliveryman.service';

interface CreateClientDto {
  username: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly createClient: CreateClientService,
    private readonly authenticateClient: AuthenticateClientService,
    private readonly createDeliveryman: CreateDeliverymanService,
    private readonly authenticateDeliveryman: AuthenticateDeliverymanService,
  ) {}

  @Post("client")
  async createClientNow(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createClient.execute({ username, password });
  }

  @Post("deliveryman")
  async create(@Body() { username, password }: CreateClientDto): Promise<void> {
    console.log({ username, password });
    await this.createDeliveryman.execute({ username, password });
  }

  @Post("client/authenticate")
  async authenticateClientNow(@Body() { username, password }: CreateClientDto): Promise<string> {
    console.log({ username, password });
    return await this.authenticateClient.execute({ username, password });
  }

  @Post("deliveryman/authenticate")
  async authenticate(@Body() { username, password }: CreateClientDto): Promise<string> {
    console.log({ username, password });
    return await this.authenticateDeliveryman.execute({ username, password });
  }
}
