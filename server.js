const { prompt } = require('inquirer');
const { viewAllRoles, viewAllEmployees } = require('./db');
const db = require('./db');
require('console.table');

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
        let selection = res.selection;
        switch (selection) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewAllRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewAllEmployees();
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
        }
    })
}

function viewDepartments() {}

function viewAllRoles() {}

function viewAllEmployees() {}

function createDepartment() {}

function createRole() {}

function createEmployee() {}

function updateRole() {}

promptUser();