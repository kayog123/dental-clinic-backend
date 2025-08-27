-- CreateTable
CREATE TABLE "public"."ServiceDentist" (
    "id" SERIAL NOT NULL,
    "dentistId" TEXT NOT NULL,
    "serviceCode" "public"."AppointmentType" NOT NULL,

    CONSTRAINT "ServiceDentist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ServiceDentist" ADD CONSTRAINT "ServiceDentist_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
