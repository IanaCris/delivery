
import { Test } from '@nestjs/testing';
import { ClientController } from 'src/modules/client/client.controller';
import { CreateClientService } from 'src/modules/client/service/createClient.service';

describe('ClientController', () => {
  let clientController: ClientController;
  let createClientService: CreateClientService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ClientController],
        providers: [CreateClientService],
      }).compile();

    createClientService = moduleRef.get<CreateClientService>(CreateClientService);
    clientController = moduleRef.get<ClientController>(ClientController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const request = {
        username: "user",
        password: "password"
      };
      
      jest.spyOn(createClientService, 'execute').mockImplementation();

      expect(await clientController.createClientNow(request)).toBeCalled();
    });
  });
});