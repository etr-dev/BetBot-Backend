import { IsString } from "class-validator";

export class GetWalletDto {
    @IsString()
    walletId: string;
}
