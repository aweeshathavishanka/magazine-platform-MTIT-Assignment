import express from "express";
import cors from "cors";
import userRoutes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service Running");
});

app.listen(3001, () => {
  console.log("User Service running on port 3001");
});
