import { connectDB } from "./config/db";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import zohoRoutes from './routes/zohoRoutes'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/',zohoRoutes)


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
