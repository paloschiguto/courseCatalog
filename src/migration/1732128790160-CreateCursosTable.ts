import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCursosTable1732128790160 implements MigrationInterface {
    name = 'CreateCursosTable1732128790160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cursos" (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                instrutor VARCHAR(255) NOT NULL,
                duracao INT,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "nome" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "instrutor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "data_criacao" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "data_criacao" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "instrutor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cursos" ALTER COLUMN "nome" DROP NOT NULL`);
    }
}
