const express = require("express")
const cron = require("node-cron");
import { api_key, api_base_url, api_service_url } from "./constants";

require('dotenv').config()

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (_, res) => {
    res.send("hello world");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});