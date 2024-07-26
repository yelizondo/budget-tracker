-- CreateTable
CREATE TABLE "Category" (
    "CategoryId" SERIAL NOT NULL,
    "CategoryGroupId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "TargetType" (
    "TargetTypeId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetType_pkey" PRIMARY KEY ("TargetTypeId")
);

-- CreateTable
CREATE TABLE "Target" (
    "TargetId" SERIAL NOT NULL,
    "TargetTypeId" INTEGER NOT NULL,
    "Amount" MONEY NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("TargetId")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "SubcategoryId" SERIAL NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "TargetId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("SubcategoryId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "ActivityId" SERIAL NOT NULL,
    "SubcategoryId" INTEGER NOT NULL,
    "Activity" MONEY NOT NULL,
    "Allocated" MONEY NOT NULL,
    "Month" TIMESTAMP(3) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("ActivityId")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_CategoryGroupId_fkey" FOREIGN KEY ("CategoryGroupId") REFERENCES "CategoryGroup"("CategoryGroupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_TargetTypeId_fkey" FOREIGN KEY ("TargetTypeId") REFERENCES "TargetType"("TargetTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_TargetId_fkey" FOREIGN KEY ("TargetId") REFERENCES "Target"("TargetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_SubcategoryId_fkey" FOREIGN KEY ("SubcategoryId") REFERENCES "Subcategory"("SubcategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
