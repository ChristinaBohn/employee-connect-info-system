const mysql = require("mysql2");
const db = require("./db/connection");

// Present user with options

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

// View all departments - READ - "SELECT * FROM table_name/departments";

// View all roles - READ - "SELECT * FROM roles";

// View all employees - READ - "SELECT * FROM employees";
   
    // Can use JOIN to add more info


// Add a department - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"

// Add a role - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"
    
    // SELECT the existing roles from the 'roles' table

    // .map() the results from 'roles' to question data for inquirer (going to need the id)
    
    // THEN prompt the user for role info (inquirer)

        // Store user's answers and INSERT them into the 'roles' table

// Add an employee - CREATE - "INSERT INTO table_name (col1, col2) VALUES (val1, val2)"


// Update an employee