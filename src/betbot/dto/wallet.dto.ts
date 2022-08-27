import { IsNumber, IsString } from 'class-validator';

export class WalletDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  escrow: string;
}
