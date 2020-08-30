import {MigrationInterface, QueryRunner} from "typeorm";

export class AddToolAndTag1598754522272 implements MigrationInterface {
    name = 'AddToolAndTag1598754522272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "link" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tool_tags_tag" ("toolId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_12e9a568bcffe408ea1ca5ff75e" PRIMARY KEY ("toolId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35930649ded18b09fbfc480f2a" ON "tool_tags_tag" ("toolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6053daccf6f69c6a915383de8" ON "tool_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "tool_tags_tag" ADD CONSTRAINT "FK_35930649ded18b09fbfc480f2a2" FOREIGN KEY ("toolId") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tool_tags_tag" ADD CONSTRAINT "FK_c6053daccf6f69c6a915383de88" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tool_tags_tag" DROP CONSTRAINT "FK_c6053daccf6f69c6a915383de88"`);
        await queryRunner.query(`ALTER TABLE "tool_tags_tag" DROP CONSTRAINT "FK_35930649ded18b09fbfc480f2a2"`);
        await queryRunner.query(`DROP INDEX "IDX_c6053daccf6f69c6a915383de8"`);
        await queryRunner.query(`DROP INDEX "IDX_35930649ded18b09fbfc480f2a"`);
        await queryRunner.query(`DROP TABLE "tool_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "tool"`);
    }

}
