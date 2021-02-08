class Employees {
  constructor() {
    this.employeesObject = {};
  }
  addEmployee(employee) {
    if (this.employeesObject[employee.id]) return false;
    this.employeesObject[employee.id] = employee;
    return true;
  }
  computeSalaryBudget() {
    let salaryArray = Object.values(this.employeesObject).map(function(
      employee
    ) {
      return +employee.salary;
    });
    let budget = salaryArray.reduce(function(accumulator, currentObj) {
      accumulator += currentObj;
      return accumulator;
    }, 0);
    return budget;
  }
}
