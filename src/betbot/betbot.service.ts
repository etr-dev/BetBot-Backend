import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BetDocument, MatchDocument, UserDocument, WalletDocument } from '@schemas';
import mongoose, { Connection, Model } from 'mongoose';
import { MatchAlreadyExistsException } from 'src/exceptions/matchAlreadyExists.exception';
import { MatchNotFoundException } from 'src/exceptions/matchNotFound.exception';
import { UserAlreadyExistsException } from 'src/exceptions/userAlreadyExists.exception';
import { CreateMatchDto } from './dto/createMatch.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { PlaceBetDto } from './dto/placeBet.dto';

@Injectable()
export class BetbotService {
  constructor(
    @InjectConnection('BetBot') private connection: Connection,
    @InjectModel('User', 'BetBot') private userModel: Model<UserDocument>,
    @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
    @InjectModel('Match', 'BetBot') private matchModel: Model<MatchDocument>,
    @InjectModel('Bet', 'BetBot') private betModel: Model<BetDocument>,
  ) { }
  
  //-----------------------------------------------------
  //                DROP USERS
  //-----------------------------------------------------
  async drop() {
    this.connection.db.dropCollection('Users');
  }

  //-----------------------------------------------------
  //                CREATE USER
  //-----------------------------------------------------
  async createUser(createUserDto: CreateUserDto) {
    const preExistingUser = await this.userModel.findOne({ userId: createUserDto.userId });
    if (preExistingUser) {
      return { message: 'FOUND', walletId: preExistingUser.walletId }
    }
    
    const createWallet = new this.walletModel({
      amount: 500,
      escrow: 0,
    })
    const walletId = (await createWallet.save())._id;

    const createdUser = new this.userModel(
    {
      userId: createUserDto.userId,
      discordGuildList: [],
      name: createUserDto.name,
      walletId,
      userBets: {
        inactiveBets: [],
        activeBets: []
      }  
    }
    );
    createdUser.discordGuildIdList.push(createUserDto.discordGuildId);
    createdUser.save();
    return { message: 'CREATED', walletId: createdUser.walletId }
  }

  //-----------------------------------------------------
  //                GET ALL USERS
  //-----------------------------------------------------
  findAll() {
    return this.userModel.find().exec();
  }

  //-----------------------------------------------------
  //                CREATE MATCH
  //-----------------------------------------------------
  async createMatch(createMatchDto: CreateMatchDto) {
    const preExistingMatch = await this.matchModel.findOne({ eventTitle: createMatchDto.eventTitle, matchTitle: createMatchDto.matchTitle });

    if (preExistingMatch) {
      return { message: 'FOUND', matchId: preExistingMatch._id }
    }
    else {
      const createdMatch = new this.matchModel( { ...createMatchDto } );
      createdMatch.save();
      return { message: 'CREATED', matchId: createdMatch._id }
    }
  }

  //-----------------------------------------------------
  //                PLACE BET
  //-----------------------------------------------------
  async placeBet(placeBetDto: PlaceBetDto) {
      const preExistingMatch = await this.matchModel.findOne({ _id: placeBetDto.matchId });

      if (!preExistingMatch) {
        throw new MatchNotFoundException(placeBetDto.matchId);
      }
    
    
    const createdBet = new this.betModel({ creationDate: Date.now(), ...placeBetDto });
    await createdBet.save();

    const updatedUser = await this.userModel.findOne({ userId: placeBetDto.userId });
    updatedUser.userBets.activeBets.push(createdBet._id);
    return updatedUser.save();

    // return { message: 'CREATED', betId: createdBet._id }
  }
}






      /*
      const existingUser = await this.userModel.findOne({ userId: createUserDto.userId });
      if (existingUser.discordGuildIdList.includes(createUserDto.discordGuildId)) {
        return 'User already exists.';
      }
      else {
        existingUser.discordGuildIdList.push(createUserDto.discordGuildId);
        existingUser.save();
        return 'User already exists but new guild was added.'
      }
      */