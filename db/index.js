const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dizzyocean048',
    database: 'employeedata'
});

connection.connect();

class db {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM department;'
        );
    }
    viewAllRoles() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        );
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
        )
    }
    addDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department
        );
    }
    addRole(role) {
        return this.connection.promise().query(
            'DELETE FROM role WHERE id = ?', role
        );
    }
    addEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        );
    }
    updateRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]
        );
    }
}

module.exports = new db(connection);