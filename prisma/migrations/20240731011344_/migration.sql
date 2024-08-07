-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_usersId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "usersId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
