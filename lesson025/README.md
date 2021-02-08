This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 1. Rewrite Employees application according to the following depicted architecture

1. App – Statefull component.

- Renders React component BrowserRouter composing of EmployeesNav component and Switch with five Routes. All paths as being exported string variables are included in the employees_config.js file.
  - “/employees” – path for routing Employees component
  - “/title/statistics” - path for routing TitleStatistics component
  - “/search” – path for routing EmployeesSearch component
  - “/generation” – path for routing EmployeesGeneration component
  - “/salary/statistics” - path for routing SalaryStatistics component
- Gets employee’s data as “Lifting State up” from Employees and EmployeesGeneration components.

2. EmployeesNav – Functional component for navigation (see OrdersNav as an example) according to the 1.1.1.1 – 1.1.1.5 paths described above
3. Employees – Statefull component for maintaining the employee’s data (adds / removes employee objects).

- Renders either EmployeesTable or EmployeeForm component
- Gets updateEmployeesFn function as a property from App component (for lifting state up)
- Gets employees as a property from App component (for keeping the current employee’s data state from App component)

4. TitleStatistics – renamed component EmployeesStatistics from the HW #27
5. EmployeesTable – with no update from the HW #27
6. EmployeeForm – Statefull component from the HW #27 with the following updates

- All parameters related to the input elements validation are imported from the file employees_config
- All additional functions for getting Form input elements are imported from the file input_elements.js

7. EmployeesSearch – Statefull component with an array of the employee objects matching the following inputted parameters of searching (this.state = {employeesSearch: []})

- Returns rendered element containing
  - Three input elements for inputting the following search parameters and clickable icon “Search” (magnifying glass). After pressing on “Search” icon there should be triggered getting the proper employee objects
    - Title name. If title name is not specified it will not be considered in the search request
    - Salary From. If a salary “from” value is not specified or it greater than Salary To or it is a negative, the 0 will be implied.
    - Salary To. If a salary “to” value is not specified the Number.MAX_VALUE will be implied
  - EmployeesTable component with attribute employees equaled to the array of the found employees (employees=this.state.employeesSearch)

8. EmployeesGeneration – Statefull component that

- Allows the user to input number of the generated random employees
- Generates entered number of the employees according to the configuration parameters imported from the file employees_config.js.
- Lifts state up - all employees should be passed to App component using updateEmployeesFn property

9. SalaryStatistics – Statefull component that

- Allows the user to enter salary interval value for getting salary statistics grouped by the ranges. For example, the inputted interval value is 5000 and minimal salary is the value equaled to 5000 imported from the employees_config.js file. Thus, the output will be as follows (maximal interval value is exclusive)
- 5000 – 10000 : `<count of employees with salary from 5000 to 9999>`
- 10000 – 15000 : `<count of employees with salary from 10000 to 14999>`
- 15000 – 20000 : `<count of employees with salary from 15000 to 19999>`
- 20000 – 25000 : `<count of employees with salary from 20000 to 24999>`
- 25000 – 30000 : `<count of employees with salary from 25000 to 29999>`
- 30000 – 35000 : `<count of employees with salary from 30000 to 34999>`
- Presents actual minimal salary
- Presents actual maximal salary
- Presents total salary budget

10. employees.js – file containing exported configuration variables for importing to the appropriate components (see the architecture)
11. input_elements.js – file containing exported functions for getting form input elements such as getInputElement, getRadioButtonElement, getSelectElement, getErrorMessageElement
12. random.js – file containing exported functions getRandomNumber and getRandomElement
13. implement Rate component
