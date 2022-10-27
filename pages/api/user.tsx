import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/mongodb";

interface ErrResType {
  error: string;
}

interface OkResType {
  message: string;
}

/* interface OkResType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: string;
} */

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrResType | OkResType>
): Promise<void> => {
  if (req.method === "POST") {
    const { name, email, cellphone, teacher } = req.body;

    if (!name || !email || !cellphone || !teacher) {
      res.status(400).json({ error: "Missing body parameter." });
      return;
    }

    const { db } = await connect();

    const response = await db.collection("users").insertOne({
      name,
      email,
      cellphone,
      teacher,
    });

    if (response.acknowledged) {
      res.status(200).json({ message: "Successful user creation."});
    }
  } else {
    res.status(400).json({ error: "Wrong request method." });
    return;
  }
};
