const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

const collectManager = async () =>{
const managerPrompts = [
    { 
        type: "input",
        message: "Please enter the name of the team manager:",
        name: "name",
        },
        {
        type: "input",
        message: "Manager's ID number:",
        name: "id",
        },
        {
        type: "input",
        message: "Manager's emial:",
        name: "email",
        },
        {
        type: "input",
        message: "Manager's office number:",
        name: "officeNumber",
        }
    ]

        const answers = await inquirer.prompt(managerPrompts)      
        return answers
    }

const collectEmployees = async (inputs = []) => {  
    const prompts = [
        { 
            type: "list",
            message: "Choose the employee's role:",
            choices: ['Engineer', 'Intern'],
            name: "role",
            },
        { 
            type: "input",
            message: "Please enter the name of the employee:",
            name: "employeeName",
            },
            {
            type: "input",
            message: "Employees's ID number:",
            name: "employeeId",
            },
            {
            type: "input",
            message: "Employee's emial:",
            name: "employeeEmail",
            },
            {
            type: "input",
            message: "Employee's github account:",
            name: "github",
            when: (answers) => answers.role === 'Engineer'
            },
            {
            type: "input",
            message: "Intern's school:",
            name: "school",
            when: (answers) => answers.role === 'Intern'
            },
            {
            type: 'confirm',
            name: 'again',
            message: 'Enter another employee? ',
            default: true
        }
        ]
        
        const {again, ...answers} = await inquirer.prompt(prompts)
        const newInputs = [...inputs, answers]
        return again ? collectEmployees(newInputs) : newInputs
    }

const main = async () => {
    const managerAnswers = await collectManager()
    const inputs = await collectEmployees ()

    const manager = new Manager (managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber)
    employees.push(manager)
    
    inputs.forEach( input => {
        if(input.role === 'Engineer'){
            const engineer = new Engineer(input.employeeName, input.employeeId, input.employeeEmail, input.github)
            employees.push(engineer)
        } else {
            const intern = new Intern(input.employeeName, input.employeeId, input.employeeEmail, input.school)
            employees.push(intern)
        }
    })

        
        const data = render(employees)
            fs.writeFile(outputPath, data, "utf8", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })              
}
            
main()