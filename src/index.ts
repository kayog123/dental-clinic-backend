import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import serviceDentistRoutes from "./routes/serviceDentistRoute";
import insuranceRoutes from "./routes/insuranceRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/service", serviceDentistRoutes);
app.use("/api/insurance", insuranceRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the dental care API server");
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
