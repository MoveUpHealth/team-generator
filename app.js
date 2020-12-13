const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
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
    
    const managerAnswers = await inquirer.prompt(managerPrompts) 
        
        const manager = new Manager (managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber)
        employees.push(manager)
        console.log(employees)
        
        

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
            const inputs = await collectEmployees ()
            inputs.forEach( input => {
                if(input.role === 'Engineer'){
                    const engineer = new Engineer(input.employeeName, input.employeeId, input.employeeEmail, input.github)
                    employees.push(engineer)
                } else {
                    const intern = new Intern(input.employeeName, input.employeeId, input.employeeEmail, input.school)
                    employees.push(intern)
                }})
                console.log(inputs)
                const data = render(employees)
        fs.writeFile(outputPath, data, "utf8", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
         })
                
            }
            // collectManager()
            main()