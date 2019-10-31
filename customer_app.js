const inquirer = require('inquirer');
const mysql = require('promise-mysql');
const config = require('./config.js');
const Table = require('cli-table2');
require('console.table');

async function run() {
  const connection = await mysql.createConnection(config);

  await displayTable(connection);
  connection.end();
};

async function custPrompt(connection) {
  console.log('Welcome to Bamazon!');
  return inquirer.prompt([
    {
      name: 'first',
      message: 'What would you like to do?.',
      type: 'list',
      choices: ['Order', 'Exit']
    },
  ]);
};

async function displayTable(connection) {
  return connection.query(`SELECT * FROM products`, (err, res) => {
    if (err) throw err;
    console.log('Selecting all products...\n');
    console.table(res);
    custPrompt();
  });
};

run();
