-- CreateTable
CREATE TABLE "Budget" (
    "BudgetId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("BudgetId")
);

-- CreateTable
CREATE TABLE "BudgetXUser" (
    "UserId" INTEGER NOT NULL,
    "BudgetId" INTEGER NOT NULL,
    "AssignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "AssignedBy" TEXT NOT NULL,

    CONSTRAINT "BudgetXUser_pkey" PRIMARY KEY ("UserId","BudgetId")
);

-- AddForeignKey
ALTER TABLE "BudgetXUser" ADD CONSTRAINT "BudgetXUser_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetXUser" ADD CONSTRAINT "BudgetXUser_BudgetId_fkey" FOREIGN KEY ("BudgetId") REFERENCES "Budget"("BudgetId") ON DELETE RESTRICT ON UPDATE CASCADE;
