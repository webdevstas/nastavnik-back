import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ip {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({unique: true})
    @Column()
    ip: string;
}