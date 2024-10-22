/*
  Warnings:

  - Added the required column `bagel` to the `Fren` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fren` ADD COLUMN `bagel` BIGINT NOT NULL;
