DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;



CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (255) NOT NULL,
  salary DECIMAL (10, 2) NOT NULL, 
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id)
  ON DELETE SET NULL
);


CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES role (id)
  ON DELETE SET NULL
);