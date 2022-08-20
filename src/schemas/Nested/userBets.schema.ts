import { Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Bet } from '../bet.schema';

export class UserBets extends Document {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }] })
  activeBets: Bet[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }] })
  inactiveBets: string[];
}