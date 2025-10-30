import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'char',
        length: 1,
        nullable: true
    })
    gender: string;

    @Column({ unique: true, type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column()
    password: string;
}