import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { Response } from './responses/response.entity';
import { MonitoringService } from './responses/monitoring.service';
import { ResponseController } from './responses/response.controller';
import { ResponseGateway } from './responses/response.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Response]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [ResponseController],
  providers: [MonitoringService, ResponseGateway],
})
export class AppModule {}