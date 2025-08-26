import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createInsurance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      insuranceName,
      insuranceGroupNumber,
      subscriberId,
      subscriberName,
    } = req.body;
    const dentalInsurance = await prisma.dentalInsurance.create({
      data: {
        userId,
        insuranceName,
        insuranceGroupNumber,
        subscriberId,
        subscriberName,
      },
    });
    res.status(201).json(dentalInsurance);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};
