class Employees {
  constructor() {
    this.employeesObject = {};
    this.budget = 0;
  }
  addEmployee(employee) {
    if (this.employeesObject[employee.id]) return false;
    this.employeesObject[employee.id] = employee;
    // optimal will be this.budget += employee.salary
    return true;
  }
  removeEmployee(id) {
    delete this.employeesObject[id];
    // optimal will be this.budget -= this.employeesObject[id].salary
  }
  computeSalaryBudget() {
    let salaryArray = Object.values(this.employeesObject).map(function(
      employee
    ) {
      return +employee.salary;
    });
    salaryArray.length > 0
      ? (this.budget = salaryArray.reduce(function(accumulator, currentObj) {
          return accumulator + currentObj;
        }, 0))
      : (this.budget = 0);
    $("#budgetDiv").removeClass("hidden");
    $("#budget").text(this.budget);
  }
  clear() {
    this.employeesObject = {};
    this.budget = 0;
  }
}
