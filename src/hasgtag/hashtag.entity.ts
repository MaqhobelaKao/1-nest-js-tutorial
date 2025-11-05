import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HashTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false, unique: true})
    name: string;
}