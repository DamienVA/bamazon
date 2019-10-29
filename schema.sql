DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('drone', 'tech', 999.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('flashlight', 'outdoor', 19.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('loufa', 'home', 9.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('diapers', 'home', 19.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('C.O.D.', 'video_game', 59.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('razors', 'home', 4.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('leaf_blower', 'outdoor', 149.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('work_boots', 'shoes', 199.99, 130);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('lamp', 'furniture', 39.99, 420);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('remote', 'tech', 29.99, 500);

SELECT * FROM products;
