This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1. Write React application for displaying random employees in the form of a table
   - Write component Employees
   - For each interval of time defined in a parent component as a property ‘interval’ there should be generated one Employee containing the following fields:
     - id – employee’s identifier (from 1), each employee should get incremented id value (first – 1, second – 2, etc.)
     - emailAddress – created as <id>@<domain>. Where ‘domain’ is one out of several predefined domains, for example : co.il, gmail.com, mail.ru, e-mail.ua;
     - name – one out of 20 predefined names (men and women)
     - gender – (male, female) name and gender should match each other
     - salary – integer in the range (5000 -35000)
     - title – one out of the following: Developer ,Development Manager, QA Tester, QA Manager, Sales Person, Sales Manager
     - The generated Employee should appear in a table as the first viewed. Thus the table will be sorted according to the id values in the descending order (with no additional sorting. Think of how to do it.
     - The body of the table should be scrollable in the case not all employees can be placed on the screen. The header should always remain at the place
2. You may use the file ‘random.js’ with two functions for random operations from the Employee project of the first part of our WEB Front-End course
   - Before each function definition, you should write the keyword ‘export’ for importing these functions to any file of the React project (export function getRandomNumber(min,max) {…}) . The example of the import statement is

import {getRandomNumber, getRandomElement} from "./random"; Put attention on the curly brackets in the import statement and on the keyword export in the random.js file
