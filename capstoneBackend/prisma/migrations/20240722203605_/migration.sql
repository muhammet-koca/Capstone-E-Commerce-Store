-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_usersId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_productsId_fkey";

-- AlterTable
ALTER TABLE "CartItems" ALTER COLUMN "quantity" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
