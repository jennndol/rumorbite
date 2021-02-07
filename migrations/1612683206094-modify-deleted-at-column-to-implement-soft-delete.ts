import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyDeletedAtColumnToImplementSoftDelete1612683206094 implements MigrationInterface {
    name = 'modifyDeletedAtColumnToImplementSoftDelete1612683206094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `article` ADD `deletedAt` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `article` ADD `deletedAt` timestamp(0) NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `deletedAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `deletedAt` timestamp(0) NULL");
    }

}
