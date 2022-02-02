const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');



 
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
        name: 'employeeFirstName',
        message: 'What is the first name of the new Employee?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the new Employee?'
    },
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

}



// View all departments - READ - "SELECT * FROM table_name/departments";
async function viewAllDepartments() {

    const departments = await db.query('SELECT * FROM departments');

    console.table(departments);
    
}

// View all roles - READ - "SELECT * FROM roles";
async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles');

    console.table(roles);

}

// View all employees - READ - "SELECT * FROM employees";
async function viewAllEmployees() {
    
    // Can use JOIN to add more info
    const employees = await db.query('SELECT * FROM employees');

    console.table(employees);

}


// Add a department - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
async function addDepartment() {

    const employees = await db.query('INSERT INTO departments (id, department_name) VALUES (${}, ${})');

    console.table(employees);

}

// Add a role - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
async function addRole() {

    // SELECT the existing roles from the 'roles' table
    
    // .map() the results from 'roles' to question data for inquirer (going to need the id)
    
    // THEN prompt the user for role info (inquirer)
    
        // Store user's answers and INSERT them into the 'roles' table

}
    

// Add an employee - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
function addEmployee() {

}

// Update an employee
function updateEmployee() {

}