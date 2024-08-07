/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productsId]` on the table `CartItems` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItems_productsId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_cartId_productsId_key" ON "CartItems"("cartId", "productsId");
