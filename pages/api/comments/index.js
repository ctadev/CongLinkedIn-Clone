import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
     try {
       const comments = await db
         .collection("comments")
         .find()
         .sort({ timestamp: -1 })
         .toArray();
       res.status(200).json(comments);
     } catch (error) {
       res.status(500).json(error);
     }
  }

  if (method === "POST") {
    try {
      const comment = await db
        .collection("comments")
            .insertOne({ ...body, Timestamp: new Timestamp() });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
  }
}
