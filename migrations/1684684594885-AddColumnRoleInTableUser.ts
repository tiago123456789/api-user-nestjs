import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnRoleInTableUser1684684594885
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users ADD role varchar(50) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users DROP role;
        `);
  }
}
