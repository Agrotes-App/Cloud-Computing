/*
  Warnings:

  - Added the required column `plantNames` to the `Diseases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Diseases` ADD COLUMN `plantNames` VARCHAR(191) NOT NULL;
