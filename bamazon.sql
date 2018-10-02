DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sketch Pad", "Drawing", 5, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charcoal Pencils", "Drawing", 10, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blending Tool", "Drawing", 3, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Canvas", "Painting", 20, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brushes", "Painting", 5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acrylic Paint", "Painting", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watercolor Palette", "Painting", 15, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clay", "Pottery", 20, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Photography", 100, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Film", "Photography", 20, 3);

