import { Transaction } from "src/transactions/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 0})
    balance: number

    @OneToMany(() => Transaction, transaction => transaction.user, { onDelete: "CASCADE" })
    transactions: Transaction[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
