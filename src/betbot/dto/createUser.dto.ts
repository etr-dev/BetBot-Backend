import { IsNumberString, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumberString()
    userId: string;

    @IsNumberString()
    discordGuildId: string;

    @IsString()
    name: string;
}
