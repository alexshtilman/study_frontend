This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1. Rewrite Employees application with components as depicted on the following picture

- Component ‘App.js’ renders the component Employees with attribute interval as a property for the component Employees
- Component Employees is stateful component (extends React.Component) renders either component EmployeesTable or component EmployeesStatistics. These both components gets the same property this.state.employees Implementation hint: Conditional rendering based on the this.state.flStatistics Initial value of this.state.flStatistics is false In the case this.state.flStatistics is true the container with the component EmployeesStatistics will be rendered, and in the case this.state.flStatistics is false the container with the component EmployeesTable will be rendered. Initial value of this.state.flStatistics is false
  - Container with the component EmployeesTable contains the following elements
    - The component EmployeesTable with attributes employees = {this.state.employees} and removeFn = {this.removeEmployee.bind(this)}
    - Clickable icon from font-awesome library with an appropriate “add” image (for example, className=”fa fa-plus-circle” ) for adding new random Employee
    - Button “Show Statistics” triggering the update of the this.state.flStatistics from false to true
    - Container with the component EmployeesStatistics contains the following elements
    - The component EmployeesStatistics with attribute employees = {this.state.employees}
    - Button “Hide Statistics” triggering the update of the this.state.flStatistics from true to false
- Component EmployeesTable is the function that gets props object with two properties (employees and removeFn) and presents table as described in the following items
  - props.employees that is an array of the objects, each of them has the following structure {id: <number>, emailAddress: <string>, name:<string>, gender:<string>,salary:<number>,title:<string>}
  - props.removeFn that is the function getting an employee id and returning true in the case an employee with the given id has been removed
  - The table header of a being presented table should contain the columns in accordance with the keys of the structure described in 1.3.1
  - Each table body record should contain the values of the structure described in 1.3.1 and additionally an clickable icon from font-awesome library with appropriate “delete” image (for example, className=”fa fa-trash”).
    - Pressing on the “delete” icon should trigger the function call that will call remove function with the argument employeeId - props.removeFn(employeeId)
  - Component EmployeesStatistics is the function that gets object props with property employees, computes title statistics and returns a table of the statistics as described in the following items
    - props.employees is the same as described in 1.3.1
    - Using lodash function countBy the component gets a statistics object and after that gets a statistics array. The code is shown below
      `const statisticsObj = _.countBy(props.employees, 'title'); const statisticsArray = Object.entries(statisticsObj) .map(e => { return {title: e[0], count: e[1]} })`
      Explanation: the method entries returns array of arrays each of them contains key as first element (e[0]) and value as the second (e[1])
- Having found statisticsArray the functional component EmployeesStatistics returns a table with columns title and count
