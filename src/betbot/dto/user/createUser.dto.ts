import { PickType } from '@nestjs/mapped-types';
import { IsNumberString, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class CreateUserDto extends PickType(UserDto, [
  'userId',
  'name',
] as const) {
  @IsNumberString()
  discordGuildId: string;
}
