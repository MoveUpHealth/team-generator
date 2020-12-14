
# Team Generator

## Table of Contents
* [Description](#description)
* [Tests](#tests)
* [Credit](#credit)

## Description

This application will generate profiles for a team from user input. [teamgenerator](https://drive.google.com/file/d/1L1I55BLneNthmPyQcXvJRkMgdiq5PKt4/view)
       
Purpose: This application was created to streamline creating a profile for members of a team, including the manager, engineers, and interns.

The user inputs the manager's information first, and then adds engineers and interns, as needed. The prompts will ask for the necessary information depending on the type of employee entered. Once all employees have been added, the application will render an html page with all of the employee profiles.

Technologies Used

* Node.js
* inquirer
* jest

Challenges: I had trouble understanding how to extend a class to subclasses.

Lessons Learned: With research, I learned how to extend a class to subclassess. I also learned how to use async and await to run different instances of inquirer prompt and loop prompts.

Future Development: In the future, I would like to adjust the presentation of the employee profiles.



## Credit 
 
I used concepts from [penandpaper: async and await loop](http://www.penandpaperprogrammer.com/blog/2018/12/16/repeating-questions-with-inquirerjs) and [reddit: async and await for multiple prompts](https://www.reddit.com/r/node/comments/9q3chw/looping_inquirerjs_prompts/) to use the async, await, and looping of prompts.



## Tests 

There are tests included that test the class and subclasses created for the employees.


        