const inquirer = require('inquirer');
const mysql = require('promise-mysql');
const config = require('./config.js');
require('console.table');

async function run() {
  const connection = await mysql.createConnection(config);

  await displayTable(connection);

};

async function custPrompt(connection) {
  console.log('Welcome to Bamazon!');
  return inquirer.prompt([
    {
      name: 'item_id',
      message: 'Enter the ID number of the product you wish to purchase.',
      filter: Number
    },
    {
      name: 'quantity',
      message: 'How many would you like?',
      filter: Number

    }
  ]).then(function (input) {
    const item = input.item_id;
    const quant = input.quantity;
    console.log(item, quant)
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, { item_id: item }, function (err, data) {
      if (err) throw err;

      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayTable();

      } else {
        var productData = data[0];

        if (quantity <= productData.stock_quantity) {
          console.log('Congratulations, the product you requested is in stock! Placing order!');

          var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err;

            console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
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
    });
  })
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
