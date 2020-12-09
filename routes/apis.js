var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const connection = `postgres://postgres:12345@localhost:5432/postgres`;
const db = pgp(connection);

/* About Covid-19 APIs */
router.get('/', (req, res, next) => {
  res.send('Covid-19 APIs version 1.0');
});

// 1. Get all confirmed
router.get('/confirmed', async (req, res, next) => {

    // Get total confirmed from database
    const result = await db.any(`select sum(cc."3/23/2020" ::INTEGER) as total from covid_confirmed cc `);
    res.json(result[0]);
});

router.get('/confirmedtable', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select province,country,covid_confirmed."3/23/2020" as confirmed from country inner join covid_confirmed on country.id = covid_confirmed.id  order by country asc`);
  res.json(result);
});

router.get('/death', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select sum(cd."3/23/2020" ::INTEGER) as total from covid_death cd `);
  res.json(result[0]);
});

router.get('/deceasedtable', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select  country.province,country,covid_death."3/23/2020" as deceased from country 
  inner join covid_death on country.id = covid_death."﻿ID" order by country asc`);
  res.json(result);
});

router.get('/recovered', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select sum(cr."3/23/2020" ::INTEGER) as total from covid_recovered cr `);
  res.json(result[0]);
});
router.get('/recoveredtable', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select country.province,country,covid_recovered."3/23/2020" as recovered from country 
  inner join covid_recovered on country.id = covid_recovered."﻿ID" order by country asc`);
  res.json(result);
});


/////map
router.get('/map', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`SELECT covid_confirmed.lat, covid_confirmed.long, country.country ,country.province ,covid_confirmed."3/23/2020" as confirmed ,covid_death."3/23/2020" as deaths,covid_recovered."3/23/2020" as recovered 
  from  country  
  inner join covid_confirmed on country.id = covid_confirmed.id 
  inner join covid_death on covid_confirmed.id = covid_death."﻿ID" 
  inner join covid_recovered on covid_death."﻿ID" = covid_recovered."﻿ID"`);
  res.json(result);
});

router.get('/toptentable', async (req, res, next) => {

  // Get total confirmed from database
  const result = await db.any(`select province,country,covid_confirmed."3/23/2020" as confirmed from country inner join covid_confirmed on country.id = covid_confirmed.id  order by "3/23/2020" desc`);
  res.json(result);
});

router.get('/searchConfirm', async (req, res, next) => {
  const search = req.params.id;
  const result = await db.any(`select province,country,covid_confirmed."3/23/2020" as confirmed from country 
  inner join covid_confirmed on country.id = covid_confirmed.id  where country LIKE %${search}% order by country asc`);

  res.json(result);
});


module.exports = router;
