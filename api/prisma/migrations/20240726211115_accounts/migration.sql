-- CreateTable
CREATE TABLE "AccountType" (
    "AccountTypeId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("AccountTypeId")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountId" SERIAL NOT NULL,
    "AccountTypeId" INTEGER NOT NULL,
    "BudgetId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Balance" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountId")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_AccountTypeId_fkey" FOREIGN KEY ("AccountTypeId") REFERENCES "AccountType"("AccountTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_BudgetId_fkey" FOREIGN KEY ("BudgetId") REFERENCES "Budget"("BudgetId") ON DELETE RESTRICT ON UPDATE CASCADE;
