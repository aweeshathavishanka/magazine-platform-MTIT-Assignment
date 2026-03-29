import { Request, Response } from "express";
import { getDB } from "../config/db";
import { ObjectId } from "mongodb";

// CREATE
export const createUser = async (req: Request, res: Response) => {
  const db = getDB();

  const existing = await db
    .collection("users")
    .findOne({ email: req.body.email });

  if (existing) {
    return res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  }

  const result = await db.collection("users").insertOne(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { id: result.insertedId, ...req.body },
  });
};

// GET ALL
export const getUsers = async (req: Request, res: Response) => {
  const db = getDB();

  const users = await db.collection("users").find().toArray();

  res.json({
    success: true,
    data: users,
  });
};

// GET BY ID
export const getUserById = async (req: Request, res: Response) => {
  const db = getDB();

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id as string) });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
  const db = getDB();

  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(req.params.id as string) },
      { $set: req.body },
      { returnDocument: "after" },
    );

  if (!result || !result.value) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(result.value);
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  const db = getDB();

  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id as string) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted" });
};
