import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";
import multer from "multer";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "public");
    },
    filename: function (request, file, callback) {
      callback(
        null,
        Date.now() + file.originalname + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 3 },
  });

  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const post = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
