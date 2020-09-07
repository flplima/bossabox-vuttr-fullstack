import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUser1599429634923 implements MigrationInterface {
    name = 'AddUser1599429634923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tool" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tag" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tool" ADD CONSTRAINT "FK_68b86fcfc928d194f745a50939d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"`);
        await queryRunner.query(`ALTER TABLE "tool" DROP CONSTRAINT "FK_68b86fcfc928d194f745a50939d"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
