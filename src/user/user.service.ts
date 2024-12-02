import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepo.findOneBy({ email: createUserDto.email });
    
    if(existUser) throw new BadRequestException('User already exist');

    const user = await this.userRepo.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    return { user };
  }

  async findOne(email: string) {
    const user = await this.userRepo.findOneBy({ email })
    return user;
  }

  async findOneById(id: number) {
    const user = await this.userRepo.findOneBy({ id })
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({id});
    console.log(user)
    if(!user) throw new BadRequestException('User not found');
  
    return await this.userRepo.update(id, updateUserDto);
  }
  
}
