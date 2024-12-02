import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Почта пользователя',
        example: 'example@example.com',
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Пароль пользрвателя',
        minLength: 6,
        required: true,
    })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
