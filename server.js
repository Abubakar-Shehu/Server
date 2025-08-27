// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');

const PORT = process.env.PORT;
const app = express();
const cors = require('cors'); // Import the CORS middleware
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://prem-stats.vercel.app/"
];
app.use(cors({
  origin: allowedOrigins // Allow only your React app's origin
}));

const premApiRoute = require('./routes/prem-stats-api');

app.get('/', (req, res) => {
  res.send("Hello");
});

app.use('/api', premApiRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
