/*
  Warnings:

  - You are about to drop the column `membershipId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `membershipPlanningId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SUCCESS', 'CANCEL');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDetail" DROP CONSTRAINT "TransactionDetail_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "membershipId",
ADD COLUMN     "membershipPlanningId" TEXT NOT NULL,
ADD COLUMN     "price" BIGINT NOT NULL,
ADD COLUMN     "snapRedirectUrl" TEXT,
ADD COLUMN     "snapToken" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Membership";

-- DropTable
DROP TABLE "TransactionDetail";

-- CreateTable
CREATE TABLE "MembershipPlanning" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberDetail" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberDetail_transactionId_key" ON "MemberDetail"("transactionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_membershipPlanningId_fkey" FOREIGN KEY ("membershipPlanningId") REFERENCES "MembershipPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberDetail" ADD CONSTRAINT "MemberDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
