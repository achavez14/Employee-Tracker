const inquirer = require('inquirer');
const { sequelize, testConnection, Employee, Role, Department } = require('./db');

// Function to display the main menu and handle user input
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit'],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all employees':
          // Implement logic to view all employees
          Employee.findAll().then((employees) => {
            console.log('All employees:', employees);
            mainMenu(); // Return to main menu
          });
          break;
          case 'Add employee':
            // Implement logic to add an employee
            inquirer
              .prompt([
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
                Employee.create(employeeData)
                  .then(() => {
                    console.log('Employee added successfully.');
                    mainMenu(); // Return to main menu
                  })
                  .catch((error) => {
                    console.error('Error adding employee:', error);
                    mainMenu(); // Return to main menu
                  });
              });
            break;
          
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
                  }
              ]).then((answers) => {
                  // Update the employee record in the database
                  connection.query(
                      'UPDATE employees SET role_id = ? WHERE id = ?',
                      [answers.newRoleId, answers.employeeId],
                      (err, res) => {
                          if (err) throw err;
                          console.log('Employee role updated successfully!');
                          // Add any additional logic here if needed
                      }
                  );
              });
              break;
          
          case 'View all roles':
            // Implement logic to view all roles
            Role.findAll().then((roles) => {
              console.log('All roles:');
              console.log(roles);
              mainMenu(); // Return to main menu
            });
            break;
          
          case 'Add role':
            // Implement logic to add a role
            inquirer
              .prompt([
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
                Role.create(roleData)
                  .then(() => {
                    console.log('Role added successfully.');
                    mainMenu(); // Return to main menu
                  })
                  .catch((error) => {
                    console.error('Error adding role:', error);
                    mainMenu(); // Return to main menu
                  });
              });
            break;
        case 'View all departments':
          // Implement logic to view all departments
          Department.findAll().then((departments) => {
            console.log('All departments:', departments);
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
                }
            ]).then((answer) => {
                // Insert the new department into the database
                connection.query(
                    'INSERT INTO departments (name) VALUES (?)',
                    [answer.departmentName],
                    (err, res) => {
                        if (err) throw err;
                        console.log('New department added successfully!');
                        // Add any additional logic here if needed
                    }
                );
            });
            break;
        case 'Quit':
          console.log('Exiting application');
          sequelize.close(); // Close the database connection
          break;
        default:
          console.log('Invalid option');
          mainMenu(); // Return to main menu
      }
    });
}

// Call the mainMenu function to start the application
testConnection()
  .then(() => {
    console.log('Database connection test successful.');
    mainMenu(); // Start the main menu
  })
  .catch((error) => {
    console.error('Error testing database connection:', error);
  });