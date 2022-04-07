USE employeedata;

INSERT INTO  department (name) VALUES
('Sales'),
('Business Office'),
('Inventory'),
('Service');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 85000, 1),
('Sales Consultant', 70000, 1),
('Business Office Manager', 80000, 2),
('Business Office Associate', 60000, 2),
('Inventory Lead', 50000, 3),
('Inventory Associate', 45000, 3),
('Service Specialist', 60000, 4),
('Service Operator', 50000, 4),
('Service Technician', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Brian', 'Langlois', 1, NULL),
('Barry', 'Wilder', 1, NULL),
('Tom', 'Baker', 2, 1),
('Alexis', 'Smith', 2, 1),
('Harry', 'Hill', 2, 2),
('Krystal', 'Li', 2, 2),
('Steve', 'Kaiser', 3, NULL),
('Tracey', 'Smith', 3, NULL),
('Dexter', 'Aldazua', 4, 7),
('Yass', 'French', 4, 7),
('Kyle', 'Hoyle', 4, 8),
('Steven', 'Wilks', 4, 8),
('Myles', 'Haley', 5, NULL),
('Nilu', 'Prasad', 5, NULL),
('Tyler', 'Bowing', 6, 13),
('Sam', 'Wilton', 6, 13),
('Jack', 'Hayes', 6, 14),
('Tristen', 'Lawrence', 6, 14),
('Terry', 'Jacko', 7, NULL),
('Lars', 'Camelo', 7, NULL),
('Gerald', 'Pagador', 8, 19),
('Doyle', 'Angelo', 8, 19),
('Nataline', 'Truong', 8, 20),
('Patrick', 'Lucky', 8, 20);
