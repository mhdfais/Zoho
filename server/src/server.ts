import { connectDB } from "./config/db";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import zohoRoutes from "./routes/zohoAuthRoutes";
import crmRoutes from './routes/zohoCrmRoutes'
// import bookRoutes from './routes/zohoBookRoutes'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", zohoRoutes);
app.use('/crm',crmRoutes)
// app.use('/book',bookRoutes)

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("db connection failed");
  });
