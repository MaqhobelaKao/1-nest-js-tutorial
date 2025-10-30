import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        unique: true, 
        type: 'varchar', 
        length: 24, 
        nullable: false 
    })
    username: string;

    @Column({ unique: true, type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}