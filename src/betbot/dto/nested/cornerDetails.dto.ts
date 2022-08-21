import { Contains, IsString, IsUrl } from 'class-validator';

export class CornerDetails {
    @IsString()
    Name: string;

    @IsString()
    Odds: string;

    @IsString()
    Outcome: string;
}