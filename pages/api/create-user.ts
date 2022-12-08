import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/mongodb";

export interface Error {
  error: string;
}

export interface Appointment {
  subjectID: string;
  timeAndDate: string;
  course: string;
  location: string;
}

export interface Review {
  subjectID: string;
  course: string;
  timestamp: string;
  review: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: string[];
  available_hours: {
    monday: number[];
    tuesday: number[];
    wednesday: number[];
    thursday: number[];
    friday: number[];
  };
  available_locations: string[];
  reviews: {
    sent: Review[];
    received: Review[];
  };
  appointments: Appointment[];
}

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<Error | User>
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

    if (teacher && (!courses || !available_hours || !available_locations)) {
      res.status(400).json({ error: "Missing body parameter." });
      return;
    }

    const { db } = await connect();

    await db
      .collection("users")
      .insertOne({
        name,
        email,
        cellphone,
        teacher,
        coins: 1,
        courses: courses || [],
        available_hours: available_hours || {},
        available_locations: available_locations || [],
        reviews: { sent: [], received: [] },
        appointments: [],
      })
      .then(insertRes => {
        if (insertRes.acknowledged) {
          db.collection("users")
            .findOne({ _id: insertRes.insertedId })
            .then(findRes => {
              res.status(200).json(JSON.parse(JSON.stringify(findRes)));
            });
        }
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  }
}
