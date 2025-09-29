const express = require('express');
const router  = express.Router();

router.get('/', (req,res) => {
  res.send("Welcome to the api routes");
});

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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams data fetched successfully');
      res.json(data);
    } catch (error) {
      console.error('Error fetching teams data:', error);
      res.status(500).json({
        error: 'Failed to fetch teams data',
        message: error.message
      });
    }
  };

  getStats();
});

router.get('/prem/table', (req,res) => {
  const url = 'https://api.football-data.org/v4/competitions/PL/standings?season=2025';
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': process.env.API_KEY
    }
  };

  const getStats = async() => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Table data fetched successfully');
      res.json(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({
        error: 'Failed to fetch table data',
        message: error.message
      });
    }
  };

  getStats();
});

router.get('/prem/matches/:id', (req,res) => {
  const neededClub = req.params.id;
  
  // Validate team ID
  if (!neededClub || isNaN(neededClub)) {
    return res.status(400).json({
      error: 'Invalid team ID',
      message: 'Team ID must be a valid number'
    });
  }
  
  // Using PL (Premier League) competition code instead of hardcoded 2021
  const url = `https://api.football-data.org/v4/teams/${neededClub}/matches?competitions=PL&season=2025`;
  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Token': process.env.API_KEY
    }
  };

  const getStats = async() => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Matches data fetched successfully for team ${neededClub}`);
      res.json(data);
    } catch (error) {
      console.error(`Error fetching matches data for team ${neededClub}:`, error);
      res.status(500).json({
        error: 'Failed to fetch matches data',
        message: error.message
      });
    }
  };

  getStats();
});


module.exports = router;