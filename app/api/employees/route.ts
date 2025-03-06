"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";

// ADD A RECORD
export async function POST(req: Request) {
  await connectToDatabase();
  
  try {
    const { firstName, lastName, email, phone, role } = await req.json();

    const employee = new Employee({
      firstName,
      lastName,
      email,
      phone,
      role,
    });

    await employee.save();

    return NextResponse.json(
      { message: "Employee created", employee },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 400 }
    );
  }
}

// GET ALL RECORDS
export async function GET() {
  await connectToDatabase();
  try {
    const employees = await Employee.find({});
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 400 });
  }
}