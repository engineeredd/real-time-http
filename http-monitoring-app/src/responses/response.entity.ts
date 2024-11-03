import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  payload: object;

  @CreateDateColumn()
  timestamp: Date;
}