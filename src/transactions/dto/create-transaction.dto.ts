import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TransactionType } from "../entities/transaction.entity";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;
}
