import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController, AppService } from '@app';
import { betFeature, matchFeature, userFeature, walletFeature } from '@schemas';
import { BetbotService } from './betbot/betbot.service';
import { BetbotController } from './betbot/betbot.controller';

config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_DB_CONNECT, {
      connectionName: 'BetBot',
    }),
    MongooseModule.forFeature([
      userFeature,
      betFeature,
      walletFeature,
      matchFeature,
    ], 'BetBot'),
  ],
  controllers: [AppController, BetbotController],
  providers: [AppService, BetbotService],
})
export class AppModule {}
