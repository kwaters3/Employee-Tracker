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
        "Delete Departments | Roles | Employees",
        "Exit"
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
          case "Delete Departments | Roles | Employees":
              deleteDepartmentRoleEmployee();
              break;
          case "Exit":
              console.log("Goodbye!");
              break;
        }
      });
    }



  function viewAllDepartments() {
      db.query(`SELECT * FROM department`, 
        (err, res) => {
        console.error(err);
        console.log('Please see below:');
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
        FROM role 
        JOIN department ON role.department_id = department.id`, 
          (err, res) => {
          console.error(err);
          console.log('Please see below:');
          console.table(res);
          startPrompt();
    });
}


  function viewAllEmployees() {
      db.query(`
        SELECT employee.id, 
        CONCAT (employee.first_name, ' ', employee.last_name) EMPLOYEE,
        role.title TITLE, 
        department.name DEPARTMENT,
        role.salary SALARY, 
        CONCAT (manager.first_name, ' ', manager.last_name) MANAGER
        FROM employee 
        JOIN role ON employee.role_id = role.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
        RIGHT JOIN department ON role.department_id = department.id`, 
          (err, res) => {
          console.error(err);
          console.log('Please see below:');
          console.table(res);
          startPrompt();
    });
}


  function addDepartment() {
    inquirer
      .prompt ({
        type: "input",
        name: "deptName",
        message: "What is the name of the new department?",
      })
      .then((response) => {
        db.query(`INSERT INTO department (name) VALUES ('${response.deptName}')`, 
          (err, res) => {
          console.error(err);
          console.log(`New department: ${response.deptName} added to company database!`);
          startPrompt();
          })
        })
      }

      

   function addRole() {
    inquirer
      .prompt ([
      {
        type: "input",
        name: "title",
        message: "What is the TITLE of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the SALARY of the new role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department id number?",
      }
    ])
      .then((response) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department_id}')`, 
          (err, res) => {
          console.error(err);
          console.log(`New role: ${response.title} added to company database!`);
          startPrompt();
          })
        })
      }   
    

  
    function addEmployee() {
    inquirer
      .prompt ([
      {
        type: "input",
        name: "first_name",
        message: "What is the First Name of the new employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Last Name of the new employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the employee's Manager ID?",
      }
    ])
      .then((response) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`, 
          (err, res) => {
          console.error(err);
          console.log(`${response.first_name} ${response.last_name} successfully added to the company's database!`);
          startPrompt();
          })
        })
      }   
      
  

    function updateEmployeeRole() {
      inquirer
        .prompt ([
        {
          type: "input",
          name: "full_name",
          message: "Which employee (First & Last name) would you like to update?",
        },
        {
          type: "input",
          name: "role_id",
          message: "What role ID do you want to update to?",
        }
      ])
        .then((response) => {
          const [first_name, last_name] = response.full_name.split(" ");
          db.query(
            `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`, 
            [response.role_id, first_name, last_name],
            (err, res) => {
            console.error(err);
            console.log(`Role successfully updated for: ${first_name} ${last_name}!`);
            startPrompt();  
            });
          });
        }



    function deleteDepartmentRoleEmployee() {
      inquirer
      .prompt ({
        type: "list",
        name: "delete",
        message: "What would you like to do?",
        choices: [
          "Remove a department",
          "Remove a role",
          "Remove an employee",
        ],
      })
      .then((response) => {
        switch (response.delete) {
            case "Remove a department":
                deleteDepartment();
                break;
            case "Remove a role":
                deleteRole();
                break;
            case "Remove an employee":
                deleteEmployee();
                break;
            }
          });
        }


    function deleteDepartment() {
      inquirer
        .prompt ([
        {
          type: "input",
          name: "department_id",
          message: "Please verify the department ID of the department you would like to delete?",
        },
      ])
        .then((response) => {
          db.query(
            `DELETE FROM department WHERE id = ?`, 
            [response.department_id],
            (err, res) => {
            err
            ? console.error(err)
            : console.log(`Department successfully deleted!`);
            startPrompt();  
            });
          });
      }



    function deleteRole() {
      inquirer
        .prompt ([
        {
          type: "input",
          name: "role",
          message: "Which role ID do you want to delete?",
        }
      ])
        .then((response) => {
          db.query(
            `DELETE FROM role WHERE role.id = ?`, 
            [response.role],
            (err, res) => {
            console.error(err);
            console.log(`Role successfully deleted!`);
            startPrompt();  
          });
        });
      }



    function deleteEmployee() {
      const showALL = "SELECT * FROM employee";
        db.query(showALL, (err, res) => {
          err
          ? console.error(err)
          : console.table(res);
        });
          inquirer
            .prompt ([
              {
                type: "input",
                name: "full_name",
                message: "Which employee (First & Last name) would you like to delete?",
              },
          ])
          .then((response) => {
            const [first_name, last_name] = response.full_name.split(" ");
            db.query(
              `SELECT * FROM employee WHERE first_name = ? AND last_name = ?`,
              [first_name, last_name],
              (err, results) => {
                if (err) {
                  console.error(err);
                  deleteEmployee();
                } else if (results.length === 0) {
                  console.log(`Employee ${first_name} ${last_name} not found in the database.`);
                  deleteEmployee();
                } else {
              db.query(
                `DELETE FROM employee WHERE first_name = ? AND last_name = ?`, 
                [first_name, last_name],
                (err, res) => {
                console.error(err);
                console.log(`Successfully deleted ${first_name} ${last_name} from the company's database!`);
                startPrompt();  
              }
            );
          }
        });
      });
    }



  app.listen(PORT, async () => {
    await console.log(`Application is running on PORT: ${PORT}`)
    startPrompt()
  })