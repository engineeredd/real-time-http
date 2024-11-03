import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';

@Controller('responses')
export class ResponseController {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  @Get()
  async getAllResponses() {
    return await this.responseRepository.find();
  }
}