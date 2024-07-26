/*
  Warnings:

  - Changed the type of `Balance` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "Balance",
ADD COLUMN     "Balance" MONEY NOT NULL;

-- CreateTable
CREATE TABLE "AvailableToBudget" (
    "AvailableToBudgetId" SERIAL NOT NULL,
    "BudgetId" INTEGER NOT NULL,
    "Amount" MONEY NOT NULL,
    "IsActive" BOOLEAN NOT NULL,

    CONSTRAINT "AvailableToBudget_pkey" PRIMARY KEY ("AvailableToBudgetId")
);

-- CreateTable
CREATE TABLE "CategoryGroup" (
    "CategoryGroupId" SERIAL NOT NULL,
    "BudgetId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryGroup_pkey" PRIMARY KEY ("CategoryGroupId")
);

-- AddForeignKey
ALTER TABLE "AvailableToBudget" ADD CONSTRAINT "AvailableToBudget_BudgetId_fkey" FOREIGN KEY ("BudgetId") REFERENCES "Budget"("BudgetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD CONSTRAINT "CategoryGroup_BudgetId_fkey" FOREIGN KEY ("BudgetId") REFERENCES "Budget"("BudgetId") ON DELETE RESTRICT ON UPDATE CASCADE;
