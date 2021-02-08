class Employees {
  constructor() {
    this.employeesObject = {};
    this.budget = 0;
    this.empLength = 0;
  }
  getPromise(value, timeOut) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(value);
      }, timeOut);
    });
  }

  addEmployee(employee) {
    if (this.employeesObject[employee.id]) return this.getPromise(false, 20);
    this.employeesObject[employee.id] = employee;
    this.empLength++;
    // optimal will be this.budget += employee.salary
    return this.getPromise(true, 0);
  }
  removeEmployee(id) {
    delete this.employeesObject[id];
    this.empLength--;
    return this.getPromise(true, 200);
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
    return this.getPromise(this.budget, 600);
  }
  clear() {
    this.employeesObject = {};
    this.budget = 0;
    this.empLength = 0;
  }
}
