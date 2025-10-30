import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    lastName: string;

    @Column({
        type: 'char',
        length: 1,
        nullable: true
    })
    gender: string;

    @Column({
        type: 'timestamp',
        nullable: true,

    })
    dateOfBirth: Date;

    @Column({
        type: 'text',
        nullable: true,
    })
    bio: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    profileIMage: string;
}