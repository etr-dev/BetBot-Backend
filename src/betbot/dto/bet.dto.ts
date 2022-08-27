import { IsInt, IsNumber, IsString } from "class-validator";

export class BetDto {
    @IsString()
    matchId: string;

    @IsString()
    userId: string;

    @IsString()
    walletId: string;

    @IsInt()
    creationDate: number;

    @IsInt()
    completionDate: number;

    @IsString()
    outcome: string = undefined;
    
    @IsString()
    selectedCorner: string;

    @IsString()
    wagerOdds: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    wagerAmount: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToWin: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToPayout: number;
}
