/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Appointments` table. All the data in the column will be lost.
  - Added the required column `dentistId` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Appointments" DROP CONSTRAINT "Appointments_doctorId_fkey";

-- AlterTable
ALTER TABLE "public"."Appointments" DROP COLUMN "doctorId",
ADD COLUMN     "dentistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Appointments" ADD CONSTRAINT "Appointments_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
