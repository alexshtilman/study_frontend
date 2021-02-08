class Employees {
  constructor(url) {
    if (!url) {
      throw new Error("no url passed!");
    }
    this.url = url;
  }

  async addEmployee(employee) {
    return ajaxSubmitEmployee.call(this, employee);
  }
  removeEmployee(id) {
    return ajaxDeleteEmployee.call(this, id);
  }
  getEmployee(id) {
    return ajaxGetEmployee.call(this, id);
  }
  getAllEmployees() {
    return ajaxGetAllEmployees.call(this);
  }
  computeSalaryBudget() {
    return ajaxCalculateBudget.call(this);
  }
  clear() {
    this.employeesObject = {};
    this.budget = 0;
    this.empLength = 0;
  }
}
async function ajaxSubmitEmployee(employee) {
  employee.id = parseInt(employee.id);
  employee.salary = parseFloat(employee.salary);
  try {
    await $.ajax({
      type: "POST",
      url: this.url,
      data: JSON.stringify(employee),
      contentType: "application/json"
    });
    return {
      resCode: 1,
      resText: `employee with id ${employee.id} added successfully!`
    };
  } catch (error) {
    if (error.readyState == 0 || error.status == 404) {
      return { resCode: -1, resText: `resource  ${this.url} is unavailable` };
    } else
      return {
        resCode: -2,
        resText: `employee with id ${employee.id} already exist!`
      };
  }
}
async function ajaxDeleteEmployee(employeeId) {
  try {
    $.ajax({
      type: "DELETE",
      url: this.url + encodeURIComponent(employeeId),
      contentType: "application/json"
    });
    return {
      resCode: 1,
      resText: `employee with id ${employee.id} deleted successfully!`
    };
  } catch (error) {
    return {
      resCode: -1,
      resText: `resource  ${this.url} is unavailable`
    };
  }
}
async function ajaxGetEmployee(id) {
  try {
    let x = await $.ajax({
      type: "GET",
      url: this.url + encodeURIComponent(id),
      contentType: "application/json"
    });
    return {
      resCode: 1,
      resText: `employee with id ${id} found!`
    };
  } catch (error) {
    return {
      resCode: -1,
      resText: `employee with id ${id} not found!`
    };
  }
}
async function ajaxGetAllEmployees() {
  try {
    let salaryArray = await $.ajax({
      type: "GET",
      url: this.url,
      contentType: "application/json",
      error: function() {
        return {
          resCode: -1,
          resText: `resource  ${this.url} is unavailable`
        };
      }
    });
    return {
      resCode: 1,
      resText: `resource  ${this.url} is available`,
      data: salaryArray
    };
  } catch (error) {
    return {
      resCode: -1,
      resText: `resource  ${this.url} is unavailable`
    };
  }
}

async function ajaxCalculateBudget() {
  try {
    let allEmployees = await $.ajax({
      type: "GET",
      url: this.url,
      contentType: "application/json"
    });
    let salaryArray = Object.values(allEmployees).map(function(employee) {
      return +employee.salary;
    });
    let budget =
      salaryArray.length > 0
        ? salaryArray.reduce(function(accumulator, currentObj) {
            return accumulator + currentObj;
          }, 0)
        : 0;
    return {
      resCode: 1,
      resText: `calculation complete`,
      data: budget
    };
  } catch (error) {
    return {
      resCode: -1,
      resText: `resource  ${this.url} is unavailable`
    };
  }
}
