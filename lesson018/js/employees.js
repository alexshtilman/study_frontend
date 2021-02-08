class Employees {
  constructor() {
    this.employeesObject = {};
    this.budget = 0;
  }
  getPromise(value) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(value);
      }, 1000);
    });
  }

  addEmployee(employee) {
    if (this.employeesObject[employee.id]) return this.getPromise(false);
    this.employeesObject[employee.id] = employee;
    // optimal will be this.budget += employee.salary
    return this.getPromise(true);
  }
  removeEmployee(id) {
    delete this.employeesObject[id];
    return this.getPromise(true);
    // optimal will be this.budget -= this.employeesObject[id].salary
  }
  computeSalaryBudget() {
    let salaryArray = Object.values(this.employeesObject).map(function(
      employee
    ) {
      return +employee.salary;
    });
    this.budget =
      salaryArray.length > 0
        ? salaryArray.reduce(function(accumulator, currentObj) {
            return accumulator + currentObj;
          }, 0)
        : 0;
    return this.getPromise(this.budget);
  }
  clear() {
    this.employeesObject = {};
    this.budget = 0;
  }
}
