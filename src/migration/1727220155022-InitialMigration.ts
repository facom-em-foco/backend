import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1727220155022 implements MigrationInterface {
    name = 'InitialMigration1727220155022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "followedTags" integer array, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publisher" ("id" integer NOT NULL, "name" character varying NOT NULL, "emailAddress" character varying NOT NULL, "registeredAt" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "REL_edf47a1a1a6c9fca862a12ba07" UNIQUE ("userId"), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying, "imagePath" character varying, "textContent" text NOT NULL, "publisherId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "date_info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP, "postDate" TIMESTAMP, "expireDate" TIMESTAMP, "postId" integer, CONSTRAINT "REL_72d4ac887f39b133e8f69dd17c" UNIQUE ("postId"), CONSTRAINT "PK_4a4a19230d36b4721f88fa2d9f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" integer NOT NULL, "publisherId" integer, CONSTRAINT "REL_293699681e8d6a4b0962750887" UNIQUE ("publisherId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId"))`);
        await queryRunner.query(`ALTER TABLE "publisher" ADD CONSTRAINT "FK_edf47a1a1a6c9fca862a12ba076" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_27dfb046b8b7e65510f1add098b" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "date_info" ADD CONSTRAINT "FK_72d4ac887f39b133e8f69dd17cf" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_293699681e8d6a4b09627508873" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "FK_444c1b4f6cd7b632277f5579354" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "FK_346168a19727fca1b1835790a14" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "FK_346168a19727fca1b1835790a14"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "FK_444c1b4f6cd7b632277f5579354"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_293699681e8d6a4b09627508873"`);
        await queryRunner.query(`ALTER TABLE "date_info" DROP CONSTRAINT "FK_72d4ac887f39b133e8f69dd17cf"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_27dfb046b8b7e65510f1add098b"`);
        await queryRunner.query(`ALTER TABLE "publisher" DROP CONSTRAINT "FK_edf47a1a1a6c9fca862a12ba076"`);
        await queryRunner.query(`DROP TABLE "post_tag"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "date_info"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
