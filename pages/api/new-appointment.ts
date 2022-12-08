import type { NextApiRequest, NextApiResponse } from "next";
import type { Appointment, Error, User } from "./create-user";
import connect from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { traceDeprecation } from "process";

export default async function newAppointment(
  req: NextApiRequest,
  res: NextApiResponse<Error | User[]>
): Promise<void> {
  if (req.method === "POST") {
    const { date, teacherID, studentID, course, location, time } = req.body;

    if (!date || !teacherID || !studentID || !course || !location || !time) {
      res.status(400).json({ error: "Missing parameter on request body." });
      return;
    }

    const response: User[] = [];

    const { db } = await connect();
    const users = db.collection("users");

    const td = "timestamp calculated"

    const teacherApt: Appointment = {
      subjectID: studentID,
      timeAndDate: td,
      course: course,
      location: location
    }

    try {
      users.updateOne(
        { _id: teacherID },
        { $push: 
          {
            appointments: teacherApt
          }
        }
      )
    } catch (err) {
      console.log(err);
    }

    await users
      .findOne({ _id: new ObjectId(teacherID) })
      .then(findRes => {
        response[0] = JSON.parse(JSON.stringify(findRes));
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });

    await users
      .findOne({ _id: new ObjectId(studentID) })
      .then(findRes => {
        response[1] = JSON.parse(JSON.stringify(findRes));
      });

    console.log(response);
    res.status(200).json(response);
  } else {
    res.status(400).json({ error: "Wrong request method." });
  }
}
