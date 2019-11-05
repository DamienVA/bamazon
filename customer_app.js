const inquirer = require('inquirer');
const mysql = require('promise-mysql');
const config = require('./config.js');
require('console.table');

async function run() {
  const connection = await mysql.createConnection(config);

  await displayTable(connection);
  // connection.end();
};

function checkInv(item, quantity, connection) {
  const {stock_quantity, price, item_id} = item
  if (quantity <= stock_quantity) {
    console.log('Congratulations, the product you requested is in stock! Placing order!');

    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (stock_quantity - quantity) + ' WHERE item_id = ' + item_id;

    connection.query(updateQueryStr, function (err, data) {
      if (err) throw err;

      console.log('Your oder has been placed! Your total is $' + price * quantity);
      console.log('Thank you for shopping with us!');
      console.log("\n---------------------------------------------------------------------\n");


    })
  } else {
    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
    console.log('Please modify your order.');
    console.log("\n---------------------------------------------------------------------\n");

    displayTable();
  }
}

async function custPrompt(connection, res) {
  console.log('Welcome to Bamazon!');
  const resObj = {}
  for(let i = 0; i <res.length; i++) {
    resObj[res[i].product_name] = res[i]
  }
  const answers = await inquirer.prompt([
    {
      name: 'item_id',
      message: 'Enter the ID number of the product you wish to purchase.',
      choices: Object.keys(resObj),
      type: 'list'

    },
    {
      name: 'quantity',
      message: 'How many would you like?',
      filter: Number

    }
  ])
    const selectedItem =  resObj[answers.item_id]
    const {quantity} = answers;
    console.log(selectedItem, quantity)
    checkInv(selectedItem, quantity, connection)
  
};

async function displayTable(connection) {
    connection.query(`SELECT * FROM products`, (err, res) => {
    if (err) throw err;
    console.log('Selecting all products...\n');
    console.table(res);
    custPrompt(connection, res);
  })
};

run();
