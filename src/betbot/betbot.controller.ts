import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { logServer } from 'src/utils/log';
import { BetbotService } from './betbot.service';
import { CreateMatchDto } from './dto/createMatch.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { GetUsersBetsDto } from './dto/getUsersBets.dto';
import { GetWalletDto } from './dto/getWallet.dto';
import { MatchCompleteDto } from './dto/matchComplete.dto';
import { PlaceBetDto } from './dto/placeBet.dto';


@Controller('betbot')
@UseGuards(AuthGuard('api-key'))
export class BetbotController {
  constructor(private readonly betbotService: BetbotService) {}

  @Delete()
  async drop() {
    return this.betbotService.drop();
  }

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.betbotService.createUser(createUserDto);
  }

  @Post('createMatch')
  async createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.betbotService.createMatch(createMatchDto);
  }

  @Post('placeBet')
  async placeBet(@Body() placeBetDto: PlaceBetDto) {
    logServer(`Bet placed by ${placeBetDto.userId}`);
    return this.betbotService.placeBet(placeBetDto);
  }

  @Post('matchComplete')
  async matchComplete(@Body() matchCompleteDto: MatchCompleteDto) {
    logServer(`Completing match ${matchCompleteDto.matchTitle}`);
    return this.betbotService.matchComplete(matchCompleteDto);
  }
  
  @Get('wallet')
  async wallet(@Body() getWalletDto: GetWalletDto) {
    return this.betbotService.wallet(getWalletDto);
  }

  @Get('getUsersBets')
  async getActiveBets(@Body() getUsersBetsDto: GetUsersBetsDto) {
    return this.betbotService.getUsersBets(getUsersBetsDto);
  }

  @Get('findAllUsers')
  async findAll() {
    return this.betbotService.findAll();
  }
}
