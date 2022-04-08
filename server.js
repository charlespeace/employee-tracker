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

// Callback functions to execute MYSQL lines from index.js

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
        .then(() => console.log('Added department!'))
        .then(() => promptUser())
    })
}

function createRole() {
    db.viewAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const allDepartments = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        prompt([
            {
                name: 'title',
                message: 'What is the name of the new role?'
            },
            {
                name: 'salary',
                message: "What is the new role's annual salary?"
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does the new role belong to?',
                choices: allDepartments
            }
        ])
        .then(role => {
            db.addRole(role)
            .then(() => console.log('Added role!'))
            .then(() => promptUser())
        })
    })
}

function createEmployee() {
    prompt ([
        {
            name: 'first_name',
            message: "What is the new employee's first name?"
        },
        {
            name: 'last_name',
            message: "What is the new employee's last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.viewAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const allRoles = roles.map (({ id, title }) => ({
                name: title,
                value: id
            }))
            prompt({
                type: 'list',
                name: 'roleId',
                message: 'What is their role?',
                choices: allRoles
            })
            .then(res => {
                let roleId = res.roleId
                db.viewAllEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const allEmployees = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt ({
                        type: 'list',
                        name: 'managerId',
                        message: 'Who is their manager?',
                        choices: allEmployees
                    })
                    .then(res => {
                        let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
                        db.addEmployee(employee)
                    })
                    .then(() => console.log(
                        'Added employee!'
                    ))
                    .then(() => promptUser())
                })
            })
        })
    })
}

function updateRole() {
    db.viewAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const allEmployees = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: "Which employee's would you like to update?",
                choices: allEmployees
            }
        ])
        .then(res => {
            let employeeId = res.employeeId;
            db.viewAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const allRoles = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'What role would you like to apply?',
                        choices: allRoles
                    }
                ])
                .then(res => db.updateRole(employeeId, res.roleId))
                .then(() => console.log('Updated role!'))
                .then(() => promptUser()) 
            })
        })
    })
}

function end() {
    process.exit();
}

promptUser();