-- CreateEnum
CREATE TYPE "public"."AppointmentType" AS ENUM ('NPE', 'NPE_NP_SRP', 'CLEANING', 'FILLING', 'EXTRACTION', 'ROOT_CANAL', 'CROWN');

-- CreateEnum
CREATE TYPE "public"."AppointmentTime" AS ENUM ('MORNING', 'AFTERNOON', 'ANYTIME');

-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED');

-- CreateTable
CREATE TABLE "public"."Appointments" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "patientGivenName" TEXT,
    "patientLastName" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "note" TEXT,
    "dentalInsuranceId" INTEGER,
    "appType" "public"."AppointmentType" NOT NULL,
    "prefferedAppointmentDate" TIMESTAMP(3) NOT NULL,
    "appointmentTime" "public"."AppointmentTime" NOT NULL,
    "status" "public"."AppointmentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DentalInsurance" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "insuranceName" TEXT NOT NULL,
    "insuranceGroupNumber" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "subscriberName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DentalInsurance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Appointments" ADD CONSTRAINT "Appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointments" ADD CONSTRAINT "Appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointments" ADD CONSTRAINT "Appointments_dentalInsuranceId_fkey" FOREIGN KEY ("dentalInsuranceId") REFERENCES "public"."DentalInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DentalInsurance" ADD CONSTRAINT "DentalInsurance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
