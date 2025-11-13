import { Profile } from "src/profile/profile.entity";
import { Tweet } from "src/tweet/tweet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ select: true })
    password: string;

    @OneToOne(() => Profile,(profile)=> profile.user, {cascade: ['insert']})
    profile?: Profile;

    @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets: Tweet[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}