-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "IsActive" SET DEFAULT true,
ALTER COLUMN "IsDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AvailableToBudget" ALTER COLUMN "IsActive" SET DEFAULT true;
