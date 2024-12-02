import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TransactionType } from "../entities/transaction.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTransactionDto {
    @ApiProperty({
        description: 'Сумма транзакции, которая будет списана либо зачислена на баланс',
        required: true,
        examples: ['600', '1000']
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty({ enum: TransactionType, description: 'Тип транзакции', example: 'refill' })
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;
}
