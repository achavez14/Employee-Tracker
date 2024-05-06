const inquirer = require('inquirer');
const { Pool } = require('pg');
// const { sequelize, testConnection, Employee, Role, Department } = require('./db');

// Function to display the main menu and handle user input
const pool = new Pool({
  user: 'postgres',
  password: 'rootroot',
  host: 'localhost',
  database: 'employee_tracker_db'
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the employee_tracker_db database.');
});

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit'],
    },
  ])
    .then(async (answers) => {
      switch (answers.action) {
        case 'View all employees':
          pool.query('SELECT * FROM Employee', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
              return;
            }
            console.log(result.rows);
            mainMenu(); // Return to main menu
          });

          break;
        case 'Add employee':
          // Implement logic to add an employee
          inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Enter the first name of the employee:',
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Enter the last name of the employee:',
            },
            {
              type: 'input',
              name: 'jobTitle',
              message: 'Enter the job title of the employee:',
            },
            {
              type: 'input',
              name: 'department',
              message: 'Enter the department of the employee:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary of the employee:',
            },
          ])
            .then((employeeData) => {
              const insertQuery = `INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
              pool.query(insertQuery, [employeeData.firstName, employeeData.lastName, employeeData.role_id, employeeData.manager_id], (error, result) => {
                if (error) {
                  console.error('Error adding employee:', error);
                } else {
                  console.log('Employee added successfully!');
                }
                mainMenu(); // Return to main menu
              });
            });

        case 'Update employee role':
          // Prompt the user for employee ID and new role details
          inquirer.prompt([
            {
              type: 'input',
              message: 'Enter the employee ID:',
              name: 'employeeId',
            },
            {
              type: 'input',
              message: 'Enter the new role ID:',
              name: 'newRoleId',
            },
          ]).then((answers) => {
            // Update the employee record in the database
            pool.query(
              'UPDATE Employee SET role_id = $1 WHERE id = $2',
              [answers.newRoleId, answers.employeeId],
              (err, result) => {
                if (err) {
                  console.error('Error updating employee role', err);
                  return;
                }
                console.log('Employee role updated successfully!');
                mainMenu();
              }
            );
          });
          break;

        case 'View all roles':
          pool.query('SELECT * FROM Role', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
              return;
            }
            console.log(result.rows); // Corrected from results.row
            mainMenu();
          });
          break;

        case 'Add role':
          // Implement logic to add a role
          inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the title of the role:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary of the role:',
            },
            {
              type: 'input',
              name: 'departmentId',
              message: 'Enter the department ID for the role:',
            },
          ])
            .then((roleData) => {
              console.log('Todo', roleData);
              mainMenu();
            });
          break;
        case 'View all departments':
          // Implement logic to view all departments
          pool.query('SELECT * FROM department', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
              return;
            }
            console.log('All departments:', result.rows);
            mainMenu(); // Return to main menu
          });
          break;
        case 'Add department':
          // Prompt the user to enter the name of the new department
          inquirer.prompt([
            {
              type: 'input',
              message: 'Enter the name of the new department:',
              name: 'departmentName',
            },
          ]).then((answer) => {
            // Insert the new department into the database
            pool.query(
              'INSERT INTO department (name) VALUES ($1)',
              [answer.departmentName],
              (err, result) => {
                if (err) {
                  console.error('Error adding department', err);
                  return;
                }
                console.log('New department added successfully!');
              }
            );
          });
          break;
        case 'Quit':
          console.log('Exiting application');
          pool.end(); // Close the database connection
          break;
        default:
          console.log('Invalid option');
          mainMenu(); // Return to main menu
      }
    });
}

// Call the mainMenu function to start the application
mainMenu();