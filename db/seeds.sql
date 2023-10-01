-- Adding data into department table - NAME column--
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
      

-- Adding data into role table - TITLE, SALARY, DEPARTMEMT ID columns--
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2), 
       ("Account Manager", 160000, 3),  
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);
       

-- Adding data into employees table - FirstName, LastName, Role ID, Manager ID columns--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Road", "Runner", 1, NULL),
       ("Wile E.", "Coyote", 2, 1),
       ("Elmer", "Fudd", 3, NULL),
       ("Porky", "Pig", 4, 3), 
       ("Yosemite", "Sam", 5, NULL),  
       ("Tasmanian", "Devil", 6, 5),
       ("Bugs", "Bunny", 7, NULL),
       ("Daffy", "Duck", 8, 7);