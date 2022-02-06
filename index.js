const inquirer = require('inquirer');
const { last } = require('lodash');
const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');


const nextActionQuestion = [
    {
        type: 'list',
        name: 'nextQuestion',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit Info System']
    }
];

const addDepartmentQuestion = [
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
    }
];


// Present user with options
async function askForNextAction() {

    const answers = await inquirer.prompt( nextActionQuestion )

    switch(answers.nextQuestion) {

        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployee();
            break;
        case 'Exit Info System':
            console.log('Goodbye!');
            break;
    }
}

askForNextAction();


async function viewAllDepartments() {
    
    const departments = await db.query('SELECT * FROM departments');
    console.table(departments);

    askForNextAction();
}

async function viewAllRoles() {

    const roles = await db.query('SELECT * FROM roles');
    console.table(roles);

    askForNextAction();

}

async function viewAllEmployees() {
    
    // Can use JOIN to add more info
    const employees = await db.query('SELECT * FROM employees');
    console.table(employees);

    askForNextAction();
}

async function addDepartment() {

    const answer = await inquirer.prompt( addDepartmentQuestion );

    let departmentName = answer.departmentName;
    let newDepartment = {
        department_name: departmentName
    }

    console.log(newDepartment)

    const department = await db.query('INSERT INTO departments SET ?', newDepartment);

    viewAllDepartments();

}

async function addRole() {

    const answers  = await inquirer.prompt( addRoleQuestions );

    let roleName = answers.roleName;
    let roleSalary = answers.roleSalary;

    const departments = await db.query('SELECT * FROM departments');

    // User chooses which department the new Role belongs in
    let departmentChoices = departments.map(({id, department_name}) => ({

        name: `${department_name}`,
        value: id

    }));

    const department = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which Department is this Role in?',
            choices: departmentChoices
        }
    ]);

    let departmentId = department.roleDepartment;

    let newRole = {
        title: roleName,
        salary: roleSalary,
        department_id: departmentId
    };

    console.log(newRole)

    const role = await db.query('INSERT INTO roles SET ?', newRole);

    viewAllRoles();

}

async function addEmployee() {

    const answers  = await inquirer.prompt( addEmployeeQuestions );

    let firstName = answers.employeeFirstName;
    let lastName = answers.employeeLastName;

    // User chooses which role the new Employee is in
    const roles = await db.query('SELECT * FROM roles');

    let roleChoices = roles.map(({id, title}) => ({

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
    ]);

    let roleId = employeeRole.role;

    // User chooses who the new Employee's manager is
    const managers = await db.query('SELECT * FROM employees');

    let managerChoices = managers.map(({id, first_name, last_name}) => ({

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
    ]);

    let managerId = employeeManager.manager;
    let newEmployee = {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId
    }

    console.log(newEmployee)

    const employee = await db.query('INSERT INTO employees SET ?', newEmployee);

    viewAllEmployees();
}

async function updateEmployee() {
    
    // User chooses which employee to update
    const employees = await db.query('SELECT * FROM employees');

    let employeeChoices = employees.map(({id, first_name, last_name}) => ({

        name: `${first_name} ${last_name}`,
        value: id

    }));
    
    const employeeUpdateChoice = await inquirer.prompt([
        {
            type: 'list',
            name: 'employees',
            message: "Which employee would you like to update?",
            choices: employeeChoices
        }
    ]);
    console.log(employeeChoices)

    let employeeIdToUpdate = employeeUpdateChoice.employees;

    // User chooses which new role this employee will have
    const roles = await db.query('SELECT * FROM roles');

    let newRoleChoices = roles.map(({id, title}) => ({

        name: `${title}`,
        value: id

    }));
    
    const updatedRoleChoice = await inquirer.prompt([
        {
            type: 'list',
            name: 'newRole',
            message: "Which new role should be added for this employee?",
            choices: newRoleChoices
        }
    ]);

    let updatedRoleId = updatedRoleChoice.newRole;

    const updatedEmployee = await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [updatedRoleId, employeeIdToUpdate]);

    viewAllEmployees();
}