const express = require('express');
const router  = express.Router();

router.get('/', (req,res) =>[
  res.send("Welcome to the api routes")
]);

router.get('/prem', (req,res) => {
  const url = 'https://api.football-data.org/v4/competitions/PL/teams?season=2025';
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': process.env.API_KEY
    }
  };

  const getStats = async() => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();  // convert response to JSON
      console.log(data);  // log the data
      res.json(data);     // send JSON response back to client
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  };

  getStats();
});

router.get('/prem/table', (req,res) => {
  const url = 'https://api.football-data.org//v4/competitions/PL/standings?season=2025';
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': process.env.API_KEY
    }
  };

  const getStats = async() => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();  // convert response to JSON
      console.log(data);  // log the data
      res.json(data);     // send JSON response back to client
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  };

  getStats();
});


module.exports = router;