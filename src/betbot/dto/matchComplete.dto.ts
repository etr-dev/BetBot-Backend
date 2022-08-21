import { Type } from 'class-transformer';
import { Contains, IsInt, IsNumber, IsString, IsUrl, Max, Min, ValidateNested } from 'class-validator';
import { CornerDetails } from './nested/cornerDetails.dto';

export class MatchCompleteDto {
  @IsString()
  eventTitle: string;

  @IsString()
  @Contains('vs')
  matchTitle: string;
    
  @IsString()
  result: string;

  @IsString()
  method: string;

  @IsString()
  time: string;

  @Min(1)
  @Max(5)
  @IsInt()
  @IsNumber()
  round: number;

  @Type(() => CornerDetails)
  @ValidateNested()
  Red: CornerDetails;
  
  @Type(() => CornerDetails)
  @ValidateNested()
  Blue: CornerDetails;
}