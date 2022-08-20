import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController, AppService } from '@app';
import { betFeature, matchFeature, userFeature, walletFeature } from '@schemas';

config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_DB_CONNECT),
    MongooseModule.forFeature([userFeature, betFeature, walletFeature, matchFeature])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
