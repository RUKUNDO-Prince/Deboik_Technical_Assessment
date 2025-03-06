"use server"

import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/mongodb";
import Employee from "../../../models/Employee";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { firstName, lastName, phone } = req.body;

    await connectToDatabase();
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { firstName, lastName, phone },
        { new: true }
      );
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ error: "Failed to update employee" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await connectToDatabase();
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      res.status(200).json({ message: "Employee deleted", deletedEmployee });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete employee" });
    }
  }
}
