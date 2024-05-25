const express = require("express")
const axios = require("axios")
const cron = require("node-cron")
const moment = require("moment-timezone");

require('dotenv').config()

const api_key = process.env.API_KEY;
const api_base_url = process.env.API_BASE_URL;

const app = express();
app.use(express.json());

const PORT = 3000;
const timezone = 'America/Chicago'

let quote;

const fetchQuote = async () => {
  try {
    const response = await axios.get(`${api_base_url}${api_key}`);
    quote = response.data
  } catch (error) {
    console.error('Error occurred while fetching the quote:', error);
  }
};

cron.schedule('0 0 * * *', () => {
  const now = moment().tz(timezone);
  if (now.hour() === 0 && now.minute() === 0) {
      fetchQuote()
    }
  }, {
  timezone 
});
  
// Initial fetch when the server starts
fetchQuote();

app.get("/quote", (req, res) => {
  res.send(quote);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

