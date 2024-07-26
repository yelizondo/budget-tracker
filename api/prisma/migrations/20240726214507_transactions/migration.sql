/*
  Warnings:

  - Added the required column `AccountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "AccountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;
