import {MigrationInterface, QueryRunner} from "typeorm";

export class init1619829913918 implements MigrationInterface {
    name = 'init1619829913918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, `username` varchar(50) NOT NULL, `email` varchar(50) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `article` (`id` varchar(36) NOT NULL, `title` varchar(100) NOT NULL, `description` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `deletedAt` datetime(6) NULL, `userId` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `base` (`id` varchar(36) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_636f17dadfea1ffb4a412296a28` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_636f17dadfea1ffb4a412296a28`");
        await queryRunner.query("DROP TABLE `base`");
        await queryRunner.query("DROP TABLE `article`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
