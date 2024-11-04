/*
  Warnings:

  - The values [TRANSFERED] on the enum `Exchange_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Exchange` MODIFY `status` ENUM('DRAFT', 'PENDING', 'PAID', 'SENT', 'SENT_COMPLETED', 'SENT_ERROR', 'REFUNDED') NOT NULL DEFAULT 'DRAFT';
