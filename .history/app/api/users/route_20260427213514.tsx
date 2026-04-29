// File: pages/api/users/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Fetching user data' });
      break;

    case 'POST':
      res.status(201).json({ message: 'Creating a new user' });
      break;

    case 'PUT':
      res.status(200).json({ message: 'Updating user data' });
      break;

    case 'DELETE':
      res.status(200).json({ message: 'Deleting user data' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}