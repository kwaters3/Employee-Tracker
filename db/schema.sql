DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;
SELECT company_db;


CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL (10, 2) NOT NULL, 
  departments_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (departments_id) REFERENCES departments (id)
);


CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);