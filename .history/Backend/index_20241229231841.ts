import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import noteRouter from "./routes/note.route";
import connectDB from "./db/connect";
import env from "dotenv";
env.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/note", noteRouter);

const port = process.env.PORT;

app.get("/",(req:,res))
const start = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log(mongoURI);

    await connectDB(mongoURI as any);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
