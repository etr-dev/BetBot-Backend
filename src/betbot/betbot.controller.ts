import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BetbotService } from './betbot.service';
import { CreateMatchDto } from './dto/createMatch.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { PlaceBetDto } from './dto/placeBet.dto';

@Controller('betbot')
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
    return this.betbotService.placeBet(placeBetDto);
  }
  
  @Get('findAllUsers')
  async findAll() {
    return this.betbotService.findAll();
  }
}
