This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1. Icon related to add new Employee connect to a method showing new component EmployeeForm. Implementation hint: Instead of the flStatistics with conditioned rendering based on false/true the flStatistics values to apply switch with employeeSwitch variable that may have one out of three values: 0 – EmployeesTable rendering; 1 – EmployeeStatistics rendering; 2 – EmployeeForm rendering
2. EmployeeForm Stateful class-component receiving from Employees a function that should be called once the data for new Employee has been submitted.
   - The EmployeeForm component presents form for inputting data about new Employee. It contains the following input elements
     - Input element for ID – id should be an unique number containing 5 digits
     - Input element for Name should be any string with length not less than 4 symbols
     - Input element for emailAddress – email address. The first part of an email should be automatically generated from the ID and name as `<name><three first digits of the ID>@`
     - Two radio buttons defining a gender (one – male, other – female). No default value.
     - Input element for entering a salary value. Number In the range 5000 – 35000
     - Select element with predefined options for entering an employee title. The option values may be taken from the previous projects
   - Requirements
     - Submit button should be active only if all the input elements contain the data according to the above specifications
     - In the case of an error input, the proper message should appear under an input field in the alert mode.
