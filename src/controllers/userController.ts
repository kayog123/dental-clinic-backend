import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const users = await prisma.user.findUnique({
      where: {
        userId: userId as string,
      },
    });
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error retrieving user: " + error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, email, firstName, lastName, profileImage, accountType } =
      req.body;
    const newUser = await prisma.user.create({
      data: {
        userId,
        email,
        firstName,
        lastName,
        profileImage,
        accountType,
      },
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const data = req.body;
  try {
    const updatedTask = await prisma.user.update({
      where: {
        userId: userId as string,
      },
      data: data,
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};
