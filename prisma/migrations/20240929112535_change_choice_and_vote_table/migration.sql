/*
  Warnings:

  - The primary key for the `Choice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Choice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `choiceId` on the `ChoiceToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `choiceId` on the `Vote` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `image` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bet` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ChoiceToken` DROP FOREIGN KEY `ChoiceToken_choiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_choiceId_fkey`;

-- AlterTable
ALTER TABLE `Choice` DROP PRIMARY KEY,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `voteRate` DOUBLE NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ChoiceToken` MODIFY `choiceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Vote` ADD COLUMN `bet` BIGINT NOT NULL,
    ADD COLUMN `isCorrect` BOOLEAN NULL,
    ADD COLUMN `payout` BIGINT NULL,
    MODIFY `choiceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ChoiceToken` ADD CONSTRAINT `ChoiceToken_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
