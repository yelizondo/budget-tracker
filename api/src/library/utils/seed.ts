import prisma from "./prisma";
import { Prisma } from "@prisma/client";

const accountTypeData: Prisma.AccountTypeCreateInput[] = [
  { Name: 'Checking' },
  { Name: 'Savings' },
  { Name: 'Cash' },
];

const transactionTypeData: Prisma.TransactionTypeCreateInput[] = [
  { Name: 'Income' },
  { Name: 'Expense' },
];

const targetTypeData: Prisma.TargetTypeCreateInput[] = [
  { Name: 'Montly' },
];

async function main() {
  console.log(`Start seeding ...`);

  // Account Type data
  for (const t of accountTypeData) {
    const result = await prisma.accountType.create({
      data: t,
    });
    console.log(`Created accountType with id: ${result.AccountTypeId}`);
  }

  // Transaction Type data
  for (const t of transactionTypeData) {
    const result = await prisma.transactionType.create({
      data: t,
    });
    console.log(`Created transactionType with id: ${result.TransactionTypeId}`);
  }

  // Target Type data
  for (const t of targetTypeData) {
    const result = await prisma.targetType.create({
      data: t,
    });
    console.log(`Created targetType with id: ${result.TargetTypeId}`);
  }

  console.log(`Seeding finished.`);
}

main()