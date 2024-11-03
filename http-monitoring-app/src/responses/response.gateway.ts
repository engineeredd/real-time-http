import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ResponseGateway {
  @WebSocketServer()
  server: Server;

  broadcastData(data: any) {
    this.server.emit('new-data', data);
  }
}