// Import Dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cfonts = require('cfonts');

const PORT = process.env.PORT || 3001;
const app = express();

