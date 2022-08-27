import { PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { WalletDto } from '../wallet.dto';

export class GetWalletDto {
  @IsString()
  walletId: string;
}
