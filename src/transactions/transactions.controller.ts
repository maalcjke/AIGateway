import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  //Можно было бы проверять роль пользователя из @Req req:
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: any) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }
}
