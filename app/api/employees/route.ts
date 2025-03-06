"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";

export async function GET() {
  await connectToDatabase();
  try {
    const employees = await Employee.find({});
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 400 });
  }
}
