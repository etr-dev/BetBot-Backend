import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { BetSelection } from '../entities/enums/betSelection.enum';

export class GetUsersBetsDto {
  @IsString()
  userId: string;

  @IsEnum(BetSelection)
  betSelection: BetSelection;

  @IsBoolean()
  attachMatchInfo: boolean = false;
}
