import type { NextApiRequest, NextApiResponse } from "next";
import type { Error, User } from "./create-user";
import connect from "../../lib/mongodb";

export default async function getUserByID(
  req: NextApiRequest,
  res: NextApiResponse<Error | User[]>
): Promise<void> {
  if (req.method === "GET") {
    const { course } = req.body;

    if (!course) {
      res.status(400).json({ error: "Missing course name on request body." });
      return;
    }

    const { db } = await connect();

    await db
      .collection("users")
      .find({ course })
      .toArray()
      .then(findRes => {
        console.log(findRes);
        res.status(200).json(JSON.parse(JSON.stringify(findRes)));
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Wrong request method." });
  }
}
