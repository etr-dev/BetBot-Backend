import { OmitType, PickType } from '@nestjs/mapped-types';
import { MatchDto } from '../match.dto';

export class CreateMatchDto extends OmitType(MatchDto, [
  'postMatchInfo',
] as const) {}
