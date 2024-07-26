-- CreateTable
CREATE TABLE "TransactionType" (
    "TransactionTypeId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionType_pkey" PRIMARY KEY ("TransactionTypeId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "TransactionId" SERIAL NOT NULL,
    "TransactionTypeId" INTEGER NOT NULL,
    "Amount" MONEY NOT NULL,
    "Description" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TransactionId")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_TransactionTypeId_fkey" FOREIGN KEY ("TransactionTypeId") REFERENCES "TransactionType"("TransactionTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
