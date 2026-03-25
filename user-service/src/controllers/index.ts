import { Request, Response } from "express";
import { User } from "../models";

let users: User[] = [];

// CREATE
export const createUser = (req: Request, res: Response) => {
  const existing = users.find((u) => u.email === req.body.email);
  if (existing) {
    return res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  }

  const user: User = {
    id: Date.now().toString(),
    ...req.body,
  };

  users.push(user);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

// GET ALL
export const getUsers = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: users,
  });
};

// GET BY ID
export const getUserById = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// UPDATE
export const updateUser = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body);
  res.json(user);
};

// DELETE
export const deleteUser = (req: Request, res: Response) => {
  users = users.filter((u) => u.id !== req.params.id);
  res.json({ message: "User deleted" });
};
