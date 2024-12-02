import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if(!user) throw new UnauthorizedException('email or password is incorrect');

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if(passwordIsMatch) return user;
  }

  async login(user: UserDto) {
    const {id, email } = user;

    return {
      id,
      email,
      access_token: this.jwtService.sign({ id, email }),
    };
  }
}
