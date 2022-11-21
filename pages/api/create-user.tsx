import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/mongodb";
// import InsertOneResult from 'node-modules/mongodb/mongodb.d.ts'

interface ErrResType {
  error: string;
}
/* 
interface OkResType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: true;
  coins: number;
  courses: string[];
  available_hours: Record<string, number[]>;
  available_locations: string[];
  reviews: Record<string, unknown>[];
  appointments: Record<string, unknown>[];
}
 */
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse /* <ErrResType | OkResType> */
): Promise<void> {
  if (req.method === "POST") {
    const {
      name,
      email,
      cellphone,
      teacher,
      courses,
      available_hours,
      available_locations,
    } = req.body;

    if (!name || !email || !cellphone) {
      res.status(400).json({ error: "Missing body parameter." });
      return;
    }

    if (teacher) {
      if (!courses || !available_hours || !available_locations) {
        res.status(400).json({ error: "Missing body parameter." });
        return;
      }
    }

    const { db } = await connect();
    const users = db.collection("users");

    const response = await users.insertOne({
      name,
      email,
      cellphone,
      teacher,
      coins: 1,
      courses: courses || [],
      available_hours: available_hours || {},
      available_locations: available_locations || [],
      reviews: [],
      appointments: [],
    });

    if (response.acknowledged) {
      const newId = response.insertedId;
      const newUser = users.findOne({_id: newId});
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ error: "Could not create user." });
    }
  } else {
    res.status(400).json({ error: "Wrong request method." });
    return;
  }
}
