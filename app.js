const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let employeeArr=[]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createManager(){
    inquirer.prompt([
      
        {
            type:"input",
            message:"What is the manager's name?",
            name:"managerName"
        },
        {
            type:"input",
            message:"What is the manager's ID number",
            name:"managerId",

        },
        {
            type:"input",
            message:"What is the manager's email?",
            name:"managerEmail",

        },
        {
            type:"input",
            message:"What is the manager's office number",
            name:"managerOfficeNum",

        }
    ]).then(function(results){
        const myManager = new Manager(results.managerName,results.managerId,results.managerEmail,results.managerOfficeNum)
        console.log(myManager);
        employeeArr.push(myManager)
        resume()

        
        
    })
}

function createEngineer(){
    inquirer.prompt([
      
        {
            type:"input",
            message:"What is the engineer's name?",
            name:"engineerName"
        },
        {
            type:"input",
            message:"What is the engineer's ID number",
            name:"engineerId",

        },
        {
            type:"input",
            message:"What is the engineer's email?",
            name:"engineerEmail",

        },
        {
            type:"input",
            message:"What is the engineer's github username?",
            name:"engineerGithub",

        }
    ]).then(function(results){
        const myengineer = new Engineer(results.engineerName,results.engineerId,results.engineerEmail,results.engineerGithub)
       
        employeeArr.push(myengineer)
        resume()

        
        
    })
}

function createIntern(){
    inquirer.prompt([
      
        {
            type:"input",
            message:"What is the Intern's name?",
            name:"InternName"
        },
        {
            type:"input",
            message:"What is the Intern's ID number",
            name:"InternId",

        },
        {
            type:"input",
            message:"What is the Intern's email?",
            name:"InternEmail",

        },
        {
            type:"input",
            message:"What is the Intern's school?",
            name:"InternSchool",

        }
    ]).then(function(results){
        const myintern = new Intern(results.InternName,results.InternId,results.InternEmail,results.InternSchool)
       
        employeeArr.push(myintern)
        resume()

    
        
    })
}
    



function resume(){

    inquirer.prompt([
        {
            type:"list",
            message:"What would youy like to do?",
            name:"next",
            choices:[
                "Add Engineer",
                "Add Intern",
                "I don't want to add any more employees"
            ]
        }
    ]).then(function(results){
        if(results.next === "Add Engineer"){
            createEngineer()
        }else if(results.next === "Add Intern"){
            createIntern()
        }else{
            writeToHtml()
        }
        
    })

}
function writeToHtml(){
    fs.writeFile("team.html",render(employeeArr),function(err){
        if (err){
            console.log(err);
            
        }
    })
}

createManager()

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
