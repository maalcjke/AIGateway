import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum TransactionType {
    REFILL = "refill",
    WITHDRAW = "withdraw"
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    amount: number

    @Column({
        type: "enum",
        enum: TransactionType,
        default: TransactionType.REFILL,
    })
    type: TransactionType

    @CreateDateColumn()
    createdAt: Date
}
