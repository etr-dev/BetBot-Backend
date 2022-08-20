import { Prop, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Bet } from '../bet.schema';

export class PostMatchInfo extends Document {
  @Prop()
  result: string;

  @Prop()
  method: string;

  @Prop()
  time: string;

  @Prop()
  round: number;

  @Prop(raw({
    name: { type: String },
    odds: { type: String },
    outcome: { type: String },
  }))
  Red: Record<string, any>;

  @Prop(raw({
    name: { type: String },
    odds: { type: String },
    outcome: { type: String },
  }))
  Blue: Record<string, any>;
}