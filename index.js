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
              name: 'role_id',
              message: 'Enter the role ID of the employee:',
            },
            {
              type: 'input',
              name: 'manager_id',
              message: 'Enter the manager ID of the employee (if applicable):',
            },
          ]).then((employeeData) => {
            // Convert manager_id to integer or set to null if not applicable
            const managerId = employeeData.manager_id.trim().toLowerCase() === 'n/a' ? null : parseInt(employeeData.manager_id);

            const insertQuery = `INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
            pool.query(insertQuery, [employeeData.firstName, employeeData.lastName, employeeData.role_id, managerId], (error, result) => {
              if (error) {
                console.error('Error adding employee:', error);
              } else {
                console.log('Employee added successfully!');
              }
              mainMenu(); // Return to the main menu
            });
          });
          break;

        case 'Update employee role':
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
            const employeeId = parseInt(answers.employeeId);
            const newRoleId = parseInt(answers.newRoleId);

            if (isNaN(employeeId) || isNaN(newRoleId)) {
              console.error('Invalid input. Please enter valid integer values for employee ID and new role ID.');
              mainMenu();
              return;
            }

            pool.query(
              'UPDATE Employee SET role_id = $1 WHERE id = $2',
              [newRoleId, employeeId],
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
              const insertQuery = `INSERT INTO Role (title, salary, department_id) VALUES ($1, $2, $3)`;
              pool.query(insertQuery, [roleData.title, roleData.salary, roleData.departmentId], (error, result) => {
                if (error) {
                  console.error('Error adding role:', error);
                } else {
                  console.log('Role added successfully!');
                }
                mainMenu(); // Return to the main menu
              });
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