import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserBets } from './Nested/userBets.schema';
import { User, UserSchema } from './user.schema';
import { Wallet } from './wallet.schema';

export type BetDocument = Bet & Document;

@Schema()
export class Bet {
    @Prop()
    matchId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    walletId: Wallet;

    @Prop()
    creationDate: number;

    @Prop()
    completionDate: number;

    @Prop()
    selectedCorner: string;

    @Prop()
    wagerOdds: string;

    @Prop()
    wagerAmount: number;

    @Prop()
    amountToWin: number;

    @Prop()
    amountToPayout: number;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
export const betFeature = { name: 'Bet', schema: BetSchema };