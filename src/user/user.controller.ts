import { Controller, Post, Body, Patch, UsePipes, ValidationPipe, UseGuards, Req, BadRequestException, Param, Get, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiUnauthorizedResponse({
  description: 'Пользователь не авторизован',
  example: {
    message: 'Unauthorized',
    statusCode: 401,
  }
})
@Controller('users')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить данные пользователя',
    description: 'Возвращает по идентификатору данные о пользователе',
  })
  @ApiBody({ description: 'Создание пользователя', type: CreateUserDto })
  @ApiParam({
    name: 'id', 
    description: 'Идентификатор пользователя', 
    example: '1'
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUser(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number
  ) {
    return this.userService.findOneById(+id);
  }

  @ApiOperation({ 
    summary: 'Создание пользователя',
    description: 'Создает пользователя и возвращает его id, email и access_token',
  })
  @ApiBody({ description: 'Создание пользователя', type: CreateUserDto })
  @ApiOkResponse({
    description: 'Создание пользователя',
    example: {
      "user": {
          "email": "example@example.com",
          "password": "$2b$10$XX2KWZYIeoLexYmOnE2BUu33Cmsk520V4u7nteG2ouL8u1/.3ITMm",
          "id": 1,
          "balance": 0,
          "createdAt": "2024-12-02T22:16:21.264Z",
          "updatedAt": "2024-12-02T22:16:21.264Z"
      }
  }
  })
  @ApiBadRequestResponse({
    description: 'Пользователь уже существует',
    example: [
      {
          "message": "User already exist",
          "error": "Bad Request",
          "statusCode": 400
      }
    ]
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id', 
    description: 'Идентификатор пользователя', 
    example: '1'
  })
  @ApiOkResponse({
    description: 'Данные об обновленных полях пользователя',
  })
  @ApiOperation({ 
    summary: 'Обновление полей пользователя',
    description: 'Обновляет указанные поля пользователя',
  })
  @ApiBody({ description: 'Обновление данных пользователя', type: UpdateUserDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
}
