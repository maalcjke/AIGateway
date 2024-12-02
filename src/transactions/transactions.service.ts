import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { Transaction, TransactionType } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Transaction) private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const payAmount: number = Number(createTransactionDto.amount);

    //Создание транзакции
    try {
      //Выполняем первую часть транзакции
      await queryRunner.manager.save(Transaction, {
        amount: payAmount,
        type: createTransactionDto.type,
        user: { id }
      });
      //Выполняем первую часть транзакции
      switch(createTransactionDto.type) { 
        case TransactionType.REFILL:
          await queryRunner.manager.increment(User, {id}, 'balance', payAmount);
          break;
        case TransactionType.WITHDRAW:
          await queryRunner.manager.decrement(User, {id}, 'balance', payAmount);
          break;
      }

      //Ошибок не выявлено - добавляем
      await queryRunner.commitTransaction();

      return { message: 'Transaction added' };
    } catch (e) {
      //Если ошибка - откатываем
      if(e !instanceof Error) throw new BadRequestException('Ошибка при оплате услуги');;
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(e.message);
    } finally {
      //Закрывем соединение
      await queryRunner.release();
    }
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepo.find({
       where: { user: { id } },
       order: { createdAt: "DESC" }
    });
    return { transactions };
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: { user: true }
    });
    if(!transaction) throw new BadRequestException('Transaction not found');
    return { transaction };
  }
}
