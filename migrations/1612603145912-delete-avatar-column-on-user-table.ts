import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteAvatarColumnOnUserTable1612603145912 implements MigrationInterface {
    name = 'deleteAvatarColumnOnUserTable1612603145912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `avatar`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `avatar` varchar(255) NOT NULL");
    }

}
