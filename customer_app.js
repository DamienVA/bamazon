const inquirer = require('inquirer');
const mysql = require('promise-mysql');
const config = require('./config');
const

async function run() {
    const connection = await mysql.createConnection(config);
    query(connect);
    connect.query(`SELECT * FROM products`, (err, res) => {
      if (err) throw err;

      
    })
}

async function custPrompt() {
    console.log('Welcome to Bamazon!');
  return inquirer.prompt([
    {
      name: 'first',
      message: 'What would you like to do?.',
      type: 'list',
      choices: ['Order', 'Exit']
    },
  ]);
}

custPrompt()