-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentName" VARCHAR(255) NOT NULL,
    "fatherName" VARCHAR(255) NOT NULL,
    "motherName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "aadharNumber" INTEGER NOT NULL,
    "penNumber" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "dateOfAdmission" TIMESTAMP(3) NOT NULL,
    "admissionNumber" INTEGER NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "IFSC" VARCHAR(255) NOT NULL,
    "nameOfBank" VARCHAR(225) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
