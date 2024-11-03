-- CreateTable
CREATE TABLE `Exchange` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PENDING', 'PAID', 'TRANSFERED', 'REFUNDED') NOT NULL DEFAULT 'DRAFT',
    `userId` VARCHAR(191) NOT NULL,
    `stars` INTEGER NOT NULL,
    `coin` ENUM('TON', 'USDT') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `toAddress` VARCHAR(191) NOT NULL,
    `telegramPaymentChargeId` VARCHAR(191) NULL,
    `providerPaymentChargeId` VARCHAR(191) NULL,
    `hash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exchange` ADD CONSTRAINT `Exchange_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
