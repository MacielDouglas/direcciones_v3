/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isSS` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `superUser` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isAdmin",
DROP COLUMN "isSS",
DROP COLUMN "superUser",
ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSs" BOOLEAN NOT NULL DEFAULT false;
