import { IUser } from "src/types/user.type";

export class UserDto implements IUser {
    id: number;
    email: string;
    password: string;
    balance: number;

}