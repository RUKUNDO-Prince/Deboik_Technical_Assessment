import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";

// @ts-expect-error
// 
// EDIT A RECORD
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const { id } = params;
    const { firstName, lastName, email, phone, role } = await req.json();
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id, 
      { firstName, lastName, email, phone, role },
      { new: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Employee updated", updatedEmployee },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 400 }
    );
  }
}

// DELETE A RECORD
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const { id } = params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 400 }
    );
  }
}