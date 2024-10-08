/*
  Warnings:

  - The primary key for the `Choice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chain` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `coinGeckoId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `contractAddr` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roundId,idx]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startDate]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[endDate]` on the table `Round` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webSlug` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Choice` DROP FOREIGN KEY `Choice_roundId_fkey`;

-- DropForeignKey
ALTER TABLE `ChoiceToken` DROP FOREIGN KEY `ChoiceToken_choiceId_fkey`;

-- DropForeignKey
ALTER TABLE `ChoiceToken` DROP FOREIGN KEY `ChoiceToken_tokenId_fkey`;

-- DropForeignKey
ALTER TABLE `Login` DROP FOREIGN KEY `Login_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Point` DROP FOREIGN KEY `Point_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_choiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_roundId_fkey`;

-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Wallet` DROP FOREIGN KEY `Wallet_userId_fkey`;

-- DropIndex
DROP INDEX `Token_coinGeckoId_key` ON `Token`;

-- DropIndex
DROP INDEX `Token_symbol_key` ON `Token`;

-- AlterTable
ALTER TABLE `Choice` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ChoiceToken` MODIFY `choiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Token` DROP COLUMN `chain`,
    DROP COLUMN `coinGeckoId`,
    DROP COLUMN `contractAddr`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `webSlug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vote` MODIFY `choiceId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Choice_roundId_idx_key` ON `Choice`(`roundId`, `idx`);

-- CreateIndex
CREATE UNIQUE INDEX `Round_startDate_key` ON `Round`(`startDate`);

-- CreateIndex
CREATE UNIQUE INDEX `Round_endDate_key` ON `Round`(`endDate`);

-- AddForeignKey
ALTER TABLE `Login` ADD CONSTRAINT `Login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Choice` ADD CONSTRAINT `Choice_roundId_fkey` FOREIGN KEY (`roundId`) REFERENCES `Round`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoiceToken` ADD CONSTRAINT `ChoiceToken_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChoiceToken` ADD CONSTRAINT `ChoiceToken_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_roundId_fkey` FOREIGN KEY (`roundId`) REFERENCES `Round`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `Choice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
