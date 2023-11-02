// -*- coding: utf-8 -*-
//index.ts
//----------------------------------
// Created By: Matthew Kastl
// Created Date: 1/17/2023
// version 1.0
//----------------------------------
// """This file is an express webserver
// that serves the public direcotry under root.
//  """ 
//----------------------------------
// 
//
//Imports
import express from "express";
import path from "path";
import dotenv from "dotenv";

import { ORM } from "./ORM";

//Load in .env file.
dotenv.config();

//Construct a new webapp, this is our server
const app = express();

//Read in what port to use from the env
const port = process.env.PORT;

//Declare the dist directory as our static dir, and host it. Anything that hits
//the / endpoint will get the dist dir back
const publicPath = path.join(__dirname, '../ClientBuild');
app.use(express.static(publicPath));


const orm = new ORM();

//Start are server on the port we selected.
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('/units', (req, res) => {
  orm.getDistinctUnits().then((data) => {
    console.warn(data);
    res.send(JSON.stringify(data));
  });
});

app.get('/location', (req, res) => {
  console.log(req.query.un);
  let testObj = {'msg': 'Location!'};
  res.send(JSON.stringify(testObj));
});

app.get('/series', (req, res) => {
  console.log(req.query.un);
  let testObj = {'msg': 'Series!'};
  res.send(JSON.stringify(testObj));
});

app.get('/source', (req, res) => {
  console.log(req.query.un);
  let testObj = {'msg': 'Source!'};
  res.send(JSON.stringify(testObj));
});

app.get('/datum', (req, res) => {
  console.log(req.query.un);
  let testObj = {'msg': 'Datum!'};
  res.send(JSON.stringify(testObj));
});