import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserBets } from './Nested/userBets.schema';
import { Wallet } from './wallet.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userId: string;

    @Prop([String])
    discordGuildIdList: string[];

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    walletId: Wallet;

    @Prop({ type: UserBets })
    userBets: UserBets;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const userFeature = { name: 'User', schema: UserSchema };