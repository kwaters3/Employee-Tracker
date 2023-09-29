-- Adding data into department table - NAME column--
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
      

-- Adding data into roles table - TITLE, SALARY, DEPARTMEMT ID columns--
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2), 
       ("Account Manager", 160000, 3),  
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);
       

-- Adding data into employees table - FirstName, LastName, Roles ID, Manager ID columns--
INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Road", "Runner", 1, NULL),
       ("Wile E.", "Coyote", 2, 1),
       ("Elmer", "Fudd", 3, NULL),
       ("Porky", "Pig", 4, 3), 
       ("Yosemite", "Sam", 5, NULL),  
       ("Tasmanian", "Devil", 6, 5),
       ("Bugs", "Bunny", 7, NULL),
       ("Daffy", "Duck", 8, 7);