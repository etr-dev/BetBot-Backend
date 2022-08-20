import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {
  }

  health(): string {
    return this.connection ? 'App is running and database is connected!' : 'App is running but database is not connected.'
  }
}
