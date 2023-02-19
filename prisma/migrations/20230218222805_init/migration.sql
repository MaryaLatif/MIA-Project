-- CreateTable
CREATE TABLE `user` (
    `user_name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
