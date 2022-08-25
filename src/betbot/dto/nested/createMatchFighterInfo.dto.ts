import { IsDefined, IsString, IsUrl } from 'class-validator';

export class CreateMatchFighterInfoDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  @IsDefined()
  image: string;
}
