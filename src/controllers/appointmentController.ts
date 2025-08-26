import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type AppointmentStatusType =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED"
  | "RESCHEDULED";

export type AppointmentTypeProps =
  | "NPE"
  | "NPE_NP_SRP" //NEW PATIENT EXAM - NP/SRP
  | "CLEANING"
  | "FILLING"
  | "EXTRACTION"
  | "ROOT_CANAL"
  | "CROWN";

export interface CreateAppointmentParams {
  userId: string;
  dentistId: string;
  patientGivenName: string;
  patientLastName: string;
  dateOfBirth: string;
  note?: string;
  dentalInsuranceId?: number;
  appType: AppointmentTypeProps;
  prefferedAppointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatusType;
}

interface CreateInsuranceParams {
  hasInsurance: boolean;
  insuranceName: string;
  insuranceGroupNumber: string;
  subscriberId: string;
  subscriberName: string;
}
export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      dentistId,
      patientGivenName,
      patientLastName,
      dateOfBirth,
      note,
      appType,
      prefferedAppointmentDate,
      appointmentTime,
      status,
      hasInsurance,
      insuranceName,
      insuranceGroupNumber,
      subscriberId,
      subscriberName,
    } = req.body as CreateAppointmentParams & CreateInsuranceParams;
    const result = await prisma.$transaction(async (tx) => {
      const newAppointmentParams = {
        userId,
        dentistId,
        patientGivenName,
        patientLastName,
        dateOfBirth,
        note,
        appType,
        prefferedAppointmentDate,
        appointmentTime,
        status,
      } as CreateAppointmentParams;

      if (hasInsurance) {
        const dentalInsurance = await tx.dentalInsurance.create({
          data: {
            userId,
            insuranceName,
            insuranceGroupNumber,
            subscriberId,
            subscriberName,
          },
        });
        newAppointmentParams.dentalInsuranceId = dentalInsurance.id;
      }

      const newAppointment = await tx.appointments.create({
        data: newAppointmentParams,
      });

      return { newAppointment };
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: `Creating appointment failed and rollback: ${error.message}`,
    });
  }
};

export const getUserAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, take, skip } = req.body as unknown as {
    userId: string;
    take: number;
    skip: number;
  };
  try {
    const users = await prisma.appointments.findMany({
      where: {
        userId: userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
export const getAppointmentId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { appointmentId } = req.params;
  try {
    const appointment = await prisma.appointments.findUnique({
      where: {
        id: Number(appointmentId),
      },
      include: {
        dentist: {
          select: {
            userId: true,
            firstName: true, // Select only the fullName field from the user table
            lastName: true,
            profileImage: true,
          },
        },
        dental: {
          select: {
            insuranceName: true,
            insuranceGroupNumber: true,
            subscriberId: true,
            subscriberName: true,
          },
        },
      },
    });
    res.json(appointment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving appointment: ${error.message}` });
  }
};
export const getDentistAppointmentDay = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, startOfDay, endOfDay } = req.body as unknown as {
    userId: string;
    startOfDay: string;
    endOfDay: string;
  };
  try {
    const users = await prisma.appointments.findMany({
      select: {
        appointmentTime: true,
      },
      where: {
        dentistId: userId as string,
        prefferedAppointmentDate: {
          gte: new Date(startOfDay), // >= 2025-08-01 00:00:00
          lt: new Date(endOfDay), // < 2025-08-02 00:00:00 (or use the nextDay approach)
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getUserAppointmentByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, startOfDay, endOfDay } = req.body as unknown as {
    userId: string;
    startOfDay: string;
    endOfDay: string;
  };
  try {
    const users = await prisma.appointments.findMany({
      where: {
        userId: userId as string,
        prefferedAppointmentDate: {
          gte: startOfDay, // >= 2025-08-01 00:00:00
          lt: endOfDay, // < 2025-08-02 00:00:00 (or use the nextDay approach)
        },
      },
      select: {
        id: true,
        note: true,
        appType: true,
        prefferedAppointmentDate: true,
        appointmentTime: true,
        status: true,
        dentist: {
          select: {
            userId: true,
            firstName: true, // Select only the fullName field from the user table
            lastName: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { appointmentId } = req.params;
  const data = req.body;
  try {
    const updatedTask = await prisma.appointments.update({
      where: {
        id: Number(appointmentId),
      },
      data: data,
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};
export const createDentalInsurance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      dentistId,
      patientGivenName,
      patientLastName,
      dateOfBirth,
      note,
      dentalInsuranceId,
      appType,
      prefferedAppointmentDate,
      appointmentTime,
      status,
    } = req.body;
    const newAppointment = await prisma.appointments.create({
      data: {
        userId,
        dentistId,
        patientGivenName,
        patientLastName,
        dateOfBirth,
        note,
        dentalInsuranceId,
        appType,
        prefferedAppointmentDate,
        appointmentTime,
        status,
      },
    });
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating appointment: ${error.message}` });
  }
};
