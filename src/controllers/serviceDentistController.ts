import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDentistList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { serviceCode } = req.body;
  try {
    const dentists = await prisma.serviceDentist.findMany({
      where: {
        serviceCode: serviceCode,
      },
      select: {
        serviceCode: true,
        serviceName: true,
        dentist: {
          select: {
            userId: true,
            firstName: true, // Select only the fullName field from the user table
            lastName: true,
            profileImage: true,
          },
        },
      },
    });
    res.json(dentists);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving dentists: ${error.message}` });
  }
};
