import express from 'express';
const mongoose = require("mongoose");
import cors from 'cors';
require("dotenv").config();
import priceRoutes from './routes/prices';
import fetchData from './services/fetchData';
import cron from "node-cron";

const url = "mongodb://localhost:27017/fomo_factory";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/prices', priceRoutes);

mongoose.connect(url), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  };
  
  //mongoose.connect(url);
  
  const conn = mongoose.createConnection(url);
  conn.on("connected", () => {
    console.log("Connected to DB");
  });
  conn.on("disconnected", () => {
    console.log("DisConnected to DB");
  });
  conn.on("error", () => {
    console.log("Could not Connected to DB");
  });
  

cron.schedule('* * * * *', fetchData);

export default app;
