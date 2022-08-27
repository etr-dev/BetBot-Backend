import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { CornerDetailsDto } from './cornerDetails.dto';

export class PostMatchInfoDto {
  @IsString()
  @IsOptional()
  result: string;

  @IsString()
  @IsOptional()
  method: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsNumber()
  @Max(5)
  @IsOptional()
  round: number;

  @ValidateNested()
  @IsOptional()
  Red: CornerDetailsDto;

  @ValidateNested()
  @IsOptional()
  Blue: CornerDetailsDto;
}
