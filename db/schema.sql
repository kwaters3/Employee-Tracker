DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;


USE company_db;

SELECT company_db;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10, 2) NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);


CREATE TABLE employees (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT, 
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  -- FOREIGN KEY (manager_id)
  -- REFERENCES employees(id),
  -- FOREIGN KEY (role_id)
  -- REFERENCES roles(id)
);