import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CornerDetailsDto } from './match/nested/cornerDetails.dto';
import { PostMatchInfoDto } from './match/nested/postMatchInfo.dto';

export class MatchDto {
  @IsString()
  eventTitle: string;

  @IsString()
  matchTitle: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsBoolean()
  isComplete: boolean;

  @ValidateNested()
  @Type(() => CornerDetailsDto)
  Red: CornerDetailsDto;

  @ValidateNested()
  @Type(() => CornerDetailsDto)
  Blue: CornerDetailsDto;

  @ValidateNested()
  @Type(() => CornerDetailsDto)
  postMatchInfo: PostMatchInfoDto;
}
