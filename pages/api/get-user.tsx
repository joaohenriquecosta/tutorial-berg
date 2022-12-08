import type { NextApiRequest, NextApiResponse } from "next";
import type { Error, User } from "./create-user";
import connect from "../../lib/mongodb";

export default async function getUserByEmail(
  req: NextApiRequest,
  res: NextApiResponse<Error | User>
): Promise<void> {
  if (req.method === "GET") {
    // TO DO: DYNAMIC SEARCH (cellphone, _id, ...)
    // How to destructure before knowing the key?
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Missing e-mail on request body." });
      return;
    }

    const { db } = await connect();

    await db
      .collection("users")
      .findOne({ email: email })
      .then(findRes => {
        res.status(200).json(JSON.parse(JSON.stringify(findRes)));
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Wrong request method." });
  }
}
