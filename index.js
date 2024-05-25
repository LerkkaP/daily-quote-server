const express = require("express")
const axios = require("axios")
const cron = require("node-cron")
const moment = require('moment-timezone');

require('dotenv').config()

const api_key = process.env.API_KEY;
const api_base_url = process.env.API_BASE_URL;

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (_, res) => {
  res.send("hello world");
});

const timezone = 'America/Chicago'

cron.schedule('0 0 * * *', () => {
  const now = moment().tz(timezone);
  if (now.hour() === 0 && now.minute() === 0) {
    /**
   * @todo make api request and cache the result for 24 hours
   */
    }
  }, {
    timezone 
  });

app.get("/quote", async (_, res) => {
    try {   
      const response = await axios.get(`${api_base_url}${api_key}`)
      res.send(response.data)
    } catch (error) {
      res.status(500).json({ error: 'There was an error in fetching the quote.' })
    }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

