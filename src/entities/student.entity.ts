import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string | null;

    @Column({nullable: true})
    lastName: string | null;

    @Column({nullable: false, default: 0})
    votesNumber: number;

    @Column({nullable: true})
    imgSrc: string;

    @Column({nullable: true})
    income: number;
}