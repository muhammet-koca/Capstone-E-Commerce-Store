/*
  Warnings:

  - You are about to drop the column `usersId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_usersId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "usersId";

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_usersId_key" ON "Cart"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_productsId_key" ON "CartItems"("productsId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
