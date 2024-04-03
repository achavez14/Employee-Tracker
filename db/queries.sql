-- Query to view all departments
SELECT id, name FROM department;

-- Query to view all roles
SELECT r.id, r.title, r.salary, d.name AS department
FROM role r
INNER JOIN department d ON r.department_id = d.id;

-- Query to view all employees
SELECT e.id, e.first_name. e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, '', m.last_name) AS manager_id
FROM employee employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- Query to add department
INSERT INTO department (name) VALUES ('New Department Name');

-- Query to add role
INSERT INTO role (title, salary, department_id) VALUES ('New Role Title', 50000, 1);

-- Query to add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);

-- Query to update an employee role
UPDATE employee SET role_id = 2 WHERE id = 1;