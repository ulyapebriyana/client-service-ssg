/*
  Warnings:

  - You are about to alter the column `telegramId` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "telegramId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");
