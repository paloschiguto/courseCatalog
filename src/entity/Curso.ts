import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("cursos") 
export class Cursos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    nome: string;

    @Column({ type: "varchar", nullable: false}) 
    instrutor: string;

    @CreateDateColumn({ name: "data_criacao" }) 
    dataCriacao: Date;
}
