import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Employee from '../../models/Employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDatabase();
    const { firstName, lastName, email, phone, role } = req.body;
    try {
      const employee = new Employee({ firstName, lastName, email, phone, role });
      await employee.save();
      res.status(201).json({ message: 'Employee created', employee });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create employee' });
    }
  }
}
