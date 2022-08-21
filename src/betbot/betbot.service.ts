import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BetDocument, MatchDocument, UserDocument, WalletDocument } from '@schemas';
import mongoose, { Connection, Model } from 'mongoose';
import { BetNotActiveException } from 'src/exceptions/betNotActive.exception';
import { MatchAlreadyExistsException } from 'src/exceptions/matchAlreadyExists.exception';
import { MatchNotFoundException } from 'src/exceptions/matchNotFound.exception';
import { UserAlreadyExistsException } from 'src/exceptions/userAlreadyExists.exception';
import { CreateMatchDto } from './dto/createMatch.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { MatchCompleteDto } from './dto/matchComplete.dto';
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
    
    
    const bet = new this.betModel({ creationDate: Date.now(), ...placeBetDto });
    await bet.save();

    const user = await this.userModel.findOne({ userId: placeBetDto.userId });
    user.userBets.activeBets.push(bet._id);
    await user.save();

    const wallet = await this.walletModel.findById(placeBetDto.walletId);
    wallet.amount -= placeBetDto.wagerAmount;
    wallet.escrow += placeBetDto.wagerAmount;
    await wallet.save();

    return { message: 'CREATED', betId: bet._id }
  }

  //-----------------------------------------------------
  //                MATCH COMPLETE
  //-----------------------------------------------------
  async matchComplete(matchCompleteDto: MatchCompleteDto) {
    const postMatchInfo = {
      result: matchCompleteDto.result,
      method: matchCompleteDto.method,
      time: matchCompleteDto.time,
      round: matchCompleteDto.round,
      Red: {
        name: matchCompleteDto.Red.Name,
        odds: matchCompleteDto.Red.Odds,
        outcome: matchCompleteDto.Red.Outcome,
      },
      Blue: {
        name: matchCompleteDto.Blue.Name,
        odds: matchCompleteDto.Blue.Odds,
        outcome: matchCompleteDto.Blue.Outcome,
      }
    }

    const match = await this.matchModel.findOneAndUpdate(
      { eventTitle: matchCompleteDto.eventTitle, matchTitle: matchCompleteDto.matchTitle },
      { $set: { postMatchInfo: postMatchInfo } },
    );

    if (!match) {
      throw new MatchNotFoundException(matchCompleteDto.matchTitle);
    }
  
    const betsOnMatch = await this.betModel.find({ matchId: match._id });

    for (let bet of betsOnMatch) {
      const wallet = await this.walletModel.findById(bet.walletId);
      const user = await this.userModel.findOne({ userId: bet.userId });

      const index = user.userBets.activeBets.indexOf(bet._id);
      if (index == -1) {  // If the bet is not found in activebets
        console.log(`Bet is not active, skipping: ${bet._id}`);
        continue;
      }

      switch (match.postMatchInfo.result) {
        case bet.selectedCorner:
          bet.outcome = 'WIN';
          wallet.amount += bet.amountToPayout;  // Payout money
          wallet.escrow -= bet.wagerAmount;
          break;
        case 'NO_CONTEST':
          bet.outcome = 'NO_CONTEST';
          wallet.amount += bet.wagerAmount; // Give money back
          wallet.escrow -= bet.wagerAmount;
          break;
        case 'DRAW':
          bet.outcome = 'DRAW';
          wallet.escrow -= bet.wagerAmount; // take money out of escrow
          break;
        default:
          bet.outcome = 'LOSS';
          wallet.escrow -= bet.wagerAmount; // take money out of escrow
          break;
      }
      bet.completionDate = Date.now();
      
      user.userBets.activeBets.splice(index, 1);
      user.userBets.inactiveBets.push(bet._id);
      
      bet.save();
      user.save();
      wallet.save();
    }

    return { message: 'COMPLETE', betId: betsOnMatch.map(bet => bet._id)}
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