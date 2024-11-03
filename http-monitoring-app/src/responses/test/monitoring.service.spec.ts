import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringService } from '../monitoring.service';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from '../response.entity';
import { ResponseGateway } from '../response.gateway';
import { of } from 'rxjs';

// Create a type for the mock response repository
type ResponseRepositoryMock = {
  create: jest.Mock;
  save: jest.Mock;
};

// Define a type for the mock HttpService to include only the necessary properties
type HttpServiceMock = {
  post: jest.Mock;
};

// Define a type for the mock ResponseGateway
type ResponseGatewayMock = {
  broadcastData: jest.Mock;
  server: any;
};

describe('MonitoringService', () => {
  let service: MonitoringService;
  let httpService: HttpServiceMock;
  let responseRepository: ResponseRepositoryMock;
  let responseGateway: ResponseGatewayMock;

  beforeEach(async () => {
    // Create a mock for the HttpService
    httpService = {
      post: jest.fn(),
    };

    // Create a mock for the ResponseGateway
    responseGateway = {
      broadcastData: jest.fn(),
      server: {},
    };

    // Create a mock repository for the Response entity
    responseRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonitoringService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: getRepositoryToken(Response),
          useValue: responseRepository,
        },
        {
          provide: ResponseGateway,
          useValue: responseGateway,
        },
      ],
    }).compile();

    service = module.get<MonitoringService>(MonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a POST request and save response', async () => {
    const mockResponse = { data: { success: true } };

    // Mock the HTTP service response
    (httpService.post as jest.Mock).mockReturnValue(of(mockResponse));

    // Mock the response repository's create method
    responseRepository.create.mockReturnValue(mockResponse);

    // Call the pingEndpoint method
    await service.pingEndpoint();

    // Assert that the POST request was called with the correct URL and payload
    expect(httpService.post).toHaveBeenCalledWith('https://httpbin.org/anything', expect.any(Object));

    // Assert that the response repository's save method was called
    expect(responseRepository.save).toHaveBeenCalledWith(mockResponse);

    // Assert that the response gateway's broadcastData method was called
    expect(responseGateway.broadcastData).toHaveBeenCalledWith(mockResponse);
  });
});