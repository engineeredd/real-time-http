import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';
import { firstValueFrom } from 'rxjs';
import { ResponseGateway } from './response.gateway';

@Injectable()
export class MonitoringService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    private responseGateway: ResponseGateway,
  ) {}

  @Interval(300000) // every 5 minutes
  async pingEndpoint() {
    const payload = { random: Math.random() };

    const response = await firstValueFrom(
      this.httpService.post('https://httpbin.org/anything', payload)
    );

    const newResponse = this.responseRepository.create({
      payload: response.data,
    });
    await this.responseRepository.save(newResponse);

    this.responseGateway.broadcastData(newResponse);
  }
}