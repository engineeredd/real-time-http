import { Test, TestingModule } from '@nestjs/testing';
import { ResponseController } from '../response.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from '../response.entity';
import { Repository } from 'typeorm';

describe('ResponseController', () => {
  let controller: ResponseController;
  let responseRepository: Repository<Response>;

  beforeEach(async () => {
    // Create a mock repository for the Response entity
    const mockResponseRepository = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponseController],
      providers: [
        {
          provide: getRepositoryToken(Response),
          useValue: mockResponseRepository,
        },
      ],
    }).compile();

    controller = module.get<ResponseController>(ResponseController);
    responseRepository = module.get<Repository<Response>>(getRepositoryToken(Response));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllResponses', () => {
    it('should return an array of responses', async () => {
      const result = [
        { id: 1, payload: { key: 'value' }, timestamp: new Date() },
        { id: 2, payload: { key: 'another value' }, timestamp: new Date() },
      ];

      // Mock the find method to return sample data
      jest.spyOn(responseRepository, 'find').mockResolvedValue(result); 

      // Call the method and expect the result to match the mock
      expect(await controller.getAllResponses()).toBe(result); 
      // Ensure that the find method was called
      expect(responseRepository.find).toHaveBeenCalled(); 
    });
  });
});