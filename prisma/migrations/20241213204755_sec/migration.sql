/*
  Warnings:

  - You are about to drop the column `class` on the `Student` table. All the data in the column will be lost.
  - Added the required column `cls` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class",
ADD COLUMN     "cls" INTEGER NOT NULL,
ALTER COLUMN "aadharNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "penNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "admissionNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "accountNumber" SET DATA TYPE BIGINT;
