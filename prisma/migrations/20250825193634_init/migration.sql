/*
  Warnings:

  - Changed the type of `appointmentTime` on the `Appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Appointments" DROP COLUMN "appointmentTime",
ADD COLUMN     "appointmentTime" TEXT NOT NULL;
