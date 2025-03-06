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

// EDIT A RECORD
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const { firstName, lastName, email, phone, role } = await req.json();
    const updatedEmployee = await Employee.findByIdAndUpdate(
      params.id,
      { firstName, lastName, email, phone, role },
      { new: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Employee updated", updatedEmployee }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update employee" }, { status: 400 });
  }
}

// DELETE A RECORD
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(params.id);

    if (!deletedEmployee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 400 });
  }
}