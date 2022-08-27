import { OmitType } from '@nestjs/mapped-types';
import { BetDto } from '../bet.dto';

export class PlaceBetDto extends OmitType(BetDto, [
  'creationDate',
  'completionDate',
  'outcome',
] as const) {}
