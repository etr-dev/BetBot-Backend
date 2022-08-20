import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PostMatchInfo } from './Nested/postMatchInfo.schema';
import { UserBets } from './Nested/userBets.schema';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
    @Prop()
    eventTitle: string;

    @Prop()
    matchTitle: string;

    @Prop()
    link: string;

    @Prop()
    postMatchInfo: PostMatchInfo;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
export const matchFeature = { name: 'Match', schema: MatchSchema };