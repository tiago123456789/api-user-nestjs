import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1684633966123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(70) NOT NULL,
                email VARCHAR(150) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXIST users
    `);
  }
}
