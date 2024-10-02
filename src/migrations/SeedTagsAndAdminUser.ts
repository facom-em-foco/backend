import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTagsAndAdminUser16728140147651 implements MigrationInterface {
  name = 'SeedTagsAndAdminUser16728140147651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO "tag" ("tagName", "tagTitle") VALUES 
          ('CC', 'CC'),
          ('EC', 'EC'),
          ('ES', 'ES'),
          ('SI', 'SI'),
          ('TADS', 'TADS'),
          ('TRC', 'TRC'),
          ('IC', 'IC'),
          ('Estágio', 'ESTAGIO'),
          ('TCC', 'TCC'),
          ('Evento', 'EVENTO'),
          ('Palestra', 'PALESTRA'),
          ('Monitoria', 'MONITORIA'),
          ('Concurso', 'CONCURSO'),
          ('Prova', 'PROVA'),
          ('Pós-Graduação', 'POS_GRADUACAO')
        `);

    await queryRunner
      .query(
        `
          INSERT INTO "user" ("followedTags") VALUES 
          (ARRAY[]::integer[]) 
          RETURNING id
        `,
      )
      .then(async result => {
        const adminId = result[0].id;

        await queryRunner.query(`
              INSERT INTO "publisher" ("id", "name", "emailAddress", "registeredAt", "active", "userId") VALUES 
              (${adminId}, 'Admin Publisher', 'admin@example.com', NOW(), true, ${adminId})
            `);

        await queryRunner.query(`
              INSERT INTO "admin" ("publisherId") VALUES 
              (${adminId})
            `);
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "admin" WHERE "publisherId" IN (SELECT "id" FROM "publisher" WHERE "name" = 'Admin Publisher')`,
    );
    await queryRunner.query(
      `DELETE FROM "publisher" WHERE "name" = 'Admin Publisher'`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE "id" IN (SELECT "userId" FROM "publisher" WHERE "name" = 'Admin Publisher')`,
    );

    await queryRunner.query(
      `DELETE FROM "tag" WHERE "tagTitle" IN ('CC', 'EC', 'ES', 'SI', 'TADS', 'TRC', 'IC', 'ESTAGIO', 'TCC', 'EVENTO', 'PALESTRA', 'MONITORIA', 'CONCURSO', 'PROVA', 'POS_GRADUACAO')`,
    );
  }
}
