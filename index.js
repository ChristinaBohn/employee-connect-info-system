const inquirer = require('inquirer');
const { last } = require('lodash');
const mysql = require('mysql2');
const db = require('./db/connection');
require('console.table')



 
const nextActionQuestion = [
    {
        type: 'list',
        name: 'nextQuestion',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    }
];

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the new Department?'
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the new Role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this Role'
    },
    {
        // Drop down choices for this question?
        type: 'input',
        name: 'roleDepartment',
        message: 'Which Department is this Role in?'
    }
];

const addEmployeeQuestions = [

    {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the new Employee\'s Role?'
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: 'Who is the new employees\'s manager?'
    }
];


// Present user with options
async function askForNextAction() {

    const answers = await inquirer.prompt( nextActionQuestion )
;    switch(answers.nextQuestion) {
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
    }

}

askForNextAction();

// View all departments - READ - "SELECT * FROM table_name/departments";
async function viewAllDepartments() {
    const departments = await db.promise().query('SELECT * FROM departments')
    console.table(departments[0])
    askForNextAction();
}

// View all roles - READ - "SELECT * FROM roles";
async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles');

    console.table(roles);

}

// View all employees - READ - "SELECT * FROM employees";
async function viewAllEmployees() {
    
    // Can use JOIN to add more info
    const employees = await db.promise().query('SELECT * FROM employees');

    console.table(employees[0]);
    askForNextAction();
}


// Add a department - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
async function addDepartment() {

    const department = await db.query('INSERT INTO departments (id, department_name) VALUES (${}, ${})');

    console.table(department);

}

// Add a role - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
async function addRole() {

    // SELECT the existing roles from the 'roles' table
    
    // .map() the results from 'roles' to question data for inquirer (going to need the id)
    
    // THEN prompt the user for role info (inquirer)
    
        // Store user's answers and INSERT them into the 'roles' table
        const role = await db.query('INSERT INTO roles (id, title, salary) VALUES (${}, ${}, ${})');

        console.table(role);

}
    

// Add an employee - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
async function addEmployee() {
    const name  = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of the new Employee?'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the last name of the new Employee?'
        }
    ]);
    let firstName = name.employeeFirstName;
    let lastName = name.employeeLastName;
    const roles = await db.promise().query('SELECT * FROM roles');
    let roleChoices = roles[0].map(({id, title}) => ({
        name: `${title}`,
        value: id
    }));
    const employeeRole = await inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is the new employee's role?",
            choices: roleChoices
        }
    ])
    let roleId = employeeRole.role;
    const managers = await db.promise().query('SELECT * FROM employees');
    let managerChoices = managers[0].map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const employeeManager = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: "Who is the new employee's manager?",
            choices: managerChoices
        }
    ])

    let managerId = employeeManager.manager;
    let newEmployee = {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId
    }

    console.log(newEmployee)

    const employee = await db.promise().query('INSERT INTO employees SET ?', newEmployee);
    viewAllEmployees();
}

// Update an employee
function updateEmployee() {



}