-- Insert sample departments
INSERT INTO Department (name) VALUES ('Engineering');
INSERT INTO Department (name) VALUES ('Marketing');
INSERT INTO Department (name) VALUES ('Sales');

-- Insert sample roles
INSERT INTO Role (title, salary, department_id) VALUES ('Software Engineer', 80000, 1);
INSERT INTO Role (title, salary, department_id) VALUES ('Marketing Manager', 70000, 2);
INSERT INTO Role (title, salary, department_id) VALUES ('Sales Representative', 60000, 3);

-- Insert sample employees
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Malia', 'Brown', 3, 1);