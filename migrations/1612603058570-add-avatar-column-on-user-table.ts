import {MigrationInterface, QueryRunner} from "typeorm";

export class addAvatarColumnOnUserTable1612603058570 implements MigrationInterface {
    name = 'addAvatarColumnOnUserTable1612603058570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `avatar` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `avatar`");
    }

}
