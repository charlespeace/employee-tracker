// Include packages and db class

const { prompt } = require('inquirer');
const db = require('./db');
require('console.table');

// Prompt user and call function based on user's selection

function promptUser () {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome to your employee management tool! What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                createDepartment();
                break;
            case 'ADD_ROLE':
                createRole();
                break;
            case 'ADD_EMPLOYEE':
                createEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateRole();
                break;
            default:
                end();
        }
    })
}

// Functions to execute MYSQL lines from index.js

function viewDepartments() {
    db.viewAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => promptUser())
}

function viewRoles() {
    db.viewAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
    })
    .then(() => promptUser())
}

function viewEmployees() {
    db.viewAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => promptUser())
}

function createDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ])
    .then(res => {
        let name = res;
        db.addDepartment(name)
        .then(() => console.log('Added department'))
        .then(() => promptUser())
    })
}

function createRole() {}

function createEmployee() {}

function updateRole() {}

function end() {
    process.exit();
}

promptUser();