import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Пользователь не авторизован',
  example: {
    message: 'Unauthorized',
    statusCode: 401,
  }
})
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ 
    summary: 'Список транзакций пользователя',
    description: 'Возвращает список транзакций пользователя за все время.',
  })
  @ApiOkResponse({
    description: 'Список транзакций пользователя',
    example: {
      "id": 28,
      "amount": 10,
      "type": "withdraw",
      "createdAt": "2024-12-02T21:30:59.548Z"
  }
  })
  @Get()
  findAll(@Req() req: any) {
    return this.transactionsService.findAll(req.user.id);
  }

  @ApiOperation({ 
    summary: 'Определенная транзакция',
    description: 'Возвращает определенную транзакцию',
  })
  @ApiOkResponse({
    description: 'Список транзакций пользователя',
    example: {
      "transaction": {
        "id": 11,
        "amount": 1000,
        "type": "withdraw",
        "createdAt": "2024-12-02T17:56:20.081Z",
        "user": {
          "id": 4,
          "email": "ya@ya.ru",
          "password": "$2b$10$VOfIAEtPoJeoByVNR0jnmuaZU4xn5YnhofTEeXvff7knsU5LNSxhK",
          "balance": 5798,
          "createdAt": "2024-12-02T15:17:22.462Z",
          "updatedAt": "2024-12-02T21:44:56.885Z"
        }
      }
    }
  })
  @ApiParam({
    name: 'id', 
    description: 'Идентификатор транзакции', 
    example: '12'
  })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return this.transactionsService.findOne(+id);
  }

  @ApiOperation({ 
    summary: 'Создать транзакцию',
    description: 'Создает транзакцию для пользователя и обновляет его баланс. Транзакция создается от лица пользователя',
  })
  @ApiOkResponse({
    description: 'Список транзакций пользователя',
    example: ['Transaction added']
  })
  @ApiBadRequestResponse({
    description: 'Транзакция не создана',
    example: ['Ошибка при оплате услуги']
  })
  @Post()
  //Можно было бы проверять роль пользователя из @Req req:
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req: any) {
    //Отсутствует проверка роли
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }
}
