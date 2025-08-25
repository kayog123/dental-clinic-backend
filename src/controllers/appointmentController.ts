import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
