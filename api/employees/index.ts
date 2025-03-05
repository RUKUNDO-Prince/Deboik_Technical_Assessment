import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongodb';
import Employee from '../../models/Employee';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await connectToDatabase();
    try {
      const employees = await Employee.find({});
      res.status(200).json(employees);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch employees' });
    }
  }
}
