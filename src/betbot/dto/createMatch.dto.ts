import { Type } from 'class-transformer';
import {
  Contains,
  IsBoolean,
  IsDefined,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CreateMatchFighterInfoDto } from './nested/createMatchFighterInfo.dto';

export class CreateMatchDto {
  @IsString()
  eventTitle: string;

  @IsString()
  @Contains('vs')
  matchTitle: string;

  @IsUrl()
  link: string;

  @IsBoolean()
  isComplete: boolean;

  @ValidateNested()
  @Type(() => CreateMatchFighterInfoDto)
  @IsDefined()
  Red: CreateMatchFighterInfoDto;

  @ValidateNested()
  @Type(() => CreateMatchFighterInfoDto)
  @IsDefined()
  Blue: CreateMatchFighterInfoDto;
}
