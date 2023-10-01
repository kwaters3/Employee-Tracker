// Import Dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cfonts = require('cfonts');

// Create Port
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection('mysql2://root:waters@localhost:3306/company_db')

// console font banner
cfonts.say('Welcome to \n"Employee-Tracker"', {
	font: 'block',              // define the font face
	align: 'center',              // define text alignment
	colors: ['redBright', 'blueBright'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: false,            // define your two gradient colors
	independentGradient: false, // define if you want to recalculate the gradient for each new line
	transitionGradient: false,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment cfonts is being executed in
});

// Command prompts
function startPrompt() {
  inquirer
    .prompt ({
      type: "list",
      name: "begin",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",

        "View Employees by Manager",
        "View Employees by Department",
        "Delete Departments | Roles | Employees",
        "View the total utilized budget of a department",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.begin) {
          case "View all departments":
              viewAllDepartments();
              break;
          case "View all roles":
              viewAllRoles();
              break;
          case "View all employees":
              viewAllEmployees();
              break;
          case "Add a department":
              addDepartment();
              break;
          case "Add a role":
              addRole();
              break;
          case "Add an employee":
              addEmployee();
              break;
          case "Update an employee role":
              updateEmployeeRole();
              break;


          case "View Employees by Manager":
              viewEmployeesByManager();
              break;
          case "View Employees by Department":
              viewEmployeesByDepartment();
              break;
          case "Delete Departments | Roles | Employees":
              deleteDepartmentsRolesEmployees();
              break;
          case "View the total utilized budget of a department":
              viewTotalUtilizedBudgetOfDepartment();
              break;
          case "Exit":
              console.log("Goodbye!");
              break;
        }
      });
    }



  function viewAllDepartments() {
      db.query(`SELECT * FROM department`, (err, res) => {
        console.error(err);
        console.table(res);
        startPrompt();
  });
}


  function viewAllRoles() {
      db.query(`
        SELECT role.id, 
        role.title TITLE, 
        role.salary SALARY, 
        department.name DEPARTMENT
        FROM role JOIN department
        ON role.department_id = department.id`, (err, res) => {
          console.error(err);
          console.table(res);
          startPrompt();
    });
}


  function viewAllEmployees() {
      db.query(`
        SELECT role.id, 
        role.title TITLE, 
        role.salary SALARY, 
        department.name DEPARTMENT
        FROM role JOIN department
        ON role.department_id = department.id`, (err, res) => {
          console.error(err);
          console.table(res);
          startPrompt();
    });
}










app.listen(PORT, async () => {
  await console.log(`Application is running on PORT: ${PORT}`)
  startPrompt()
})