import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ 
    summary: 'Авторизация пользователя',
    description: 'Возвращает данные пользователя и access_token',
  })
  @ApiBody({ description: 'Авторизация пользователя', type: CreateUserDto })
  @ApiOkResponse({
    description: 'Успешная авторизация',
    example: {
      "id": 0,
      "email": "example@example.com",
      "access_token": "unic_token"
  }
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
    example: {
      "message": "email or password is incorrect",
      "error": "Unauthorized",
      "statusCode": 401
    }
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
