import { Test, TestingModule } from '@nestjs/testing';
import { ResponseGateway } from '../response.gateway';
import { Server } from 'socket.io';

describe('ResponseGateway', () => {
  let gateway: ResponseGateway;
  let server: Server;

  beforeEach(async () => {
    // Create a mock for the Socket.IO server
    server = {
      emit: jest.fn(),
    } as unknown as Server;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseGateway,
      ],
    }).compile();

    gateway = module.get<ResponseGateway>(ResponseGateway);
    // Directly assign the mock server to the gateway instance
    gateway.server = server;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('broadcastData', () => {
    it('should emit new data', () => {
      const mockData = { key: 'value' };

      // Call the method to test
      gateway.broadcastData(mockData);

      // Assert that the emit method was called with the correct event and data
      expect(server.emit).toHaveBeenCalledWith('new-data', mockData);
    });
  });
});