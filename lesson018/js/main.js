const employeeForm = new FormHandler("#employeeForm");
var $employeeDiv = $("#employeeDiv");
const employeeGenerateForm = new FormHandler("#generation");
function displayAlertMessage(elementSelector, text, className) {
  elementSelector.text(text);
  elementSelector.addClass(className);
  elementSelector.fadeIn(400);
  setTimeout(function() {
    elementSelector.fadeOut(1000);
  }, 3000);
}

const employees = new Employees();
const tableEmployees = new Table(
  ["id", "emailAddress", "gender", "name", "salary", "title"],
  "#tableHead",
  "#tableBody",
  "id",
  function(id) {
    $("#loadingBudget").removeClass("hidden");
    $("#budget").addClass("hidden");
    submitSwitch(true, "#confirmSubmit", "#confirmLoading");

    return employees.removeEmployee(id).then(function() {
      return employees.computeSalaryBudget().then(function(budget) {
        $("#budget").removeClass("hidden");
        $("#budget").text(budget);
        $("#loadingBudget").addClass("hidden");
        displayAlertMessage(
          $("#employeeTable"),
          `employee with id ${id} was deleted successfully!`,
          "alert-success"
        );
        submitSwitch(false, "#confirmSubmit", "#confirmLoading");
        $("#modalDiv").modal("hide");
      });
    });
  }
);
function submitSwitch(status, submitSelector, loadingSelector) {
  if (status) {
    $(loadingSelector).removeClass("hidden");
    $(submitSelector).addClass("hidden");
  } else {
    $(loadingSelector).addClass("hidden");
    $(submitSelector).removeClass("hidden");
  }
}
employeeForm.addHandler(function(employee) {
  submitSwitch(true, "#addEmployeeSubmit", "#addEmployeeLoading");
  return employees
    .addEmployee(employee)
    .then(function(message) {
      if (!message) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            displayAlertMessage(
              $employeeDiv,
              `employee with ${employee.id} already exist!`,
              "alert-danger"
            );
            resolve(`employee with ${employee.id} already exist!`);
          }, 1000);
        });
      }

      tableEmployees.addRow(employee);
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve("");
        }, 1000);
      });
    })
    .then(function(message) {
      submitSwitch(false, "#addEmployeeSubmit", "#addEmployeeLoading");
      if (!message) {
        employees.computeSalaryBudget().then(function(budget) {
          $("#budgetDiv").removeClass("hidden");
          $("#budget").text(budget);
          displayAlertMessage(
            $employeeDiv,
            `employee with ${employee.id} added successfully!`,
            "alert-success"
          );
        });
      } else {
        return new Promise(function(resolve) {
          setTimeout(function() {
            displayAlertMessage($employeeDiv, message, "alert-danger");
            resolve(message);
          }, 1000);
        });
      }
    });
});

function checkFormFields(params) {
  if (+params.employeesCount > 0 && +params.employeesCount < 101) {
    if (+params.idLength > 0 && +params.idLength < 6) {
      if (+params.minSalary > 0) {
        if (+params.maxSalary > 0) {
          if (+params.maxSalary > +params.minSalary) {
            return "ok";
          } else return "Max salary should be greater then min salary";
        } else return "Wrong max salary";
      } else return "Wrong min salary";
    } else return "Wrong number of digits for ID";
  } else return "Wrong number of employees";
}
employeeGenerateForm.addHandler(function(params) {
  const result = checkFormFields(params);
  submitSwitch(true, "#generationSubmit", "#generationLoading");
  if (result === "ok") {
    employees.clear();

    tableEmployees.clear();
    const minIdLength = Math.pow(10, params.idLength - 1);
    const maxIdLength = Math.pow(10, params.idLength) - 1;
    for (let i = 0; i < params.employeesCount; i++) {
      let randomEmployee = generateRandomEmployee(
        params.minSalary,
        params.maxSalary,
        minIdLength,
        maxIdLength,
        employees
      );
      employees.addEmployee(randomEmployee).then(function() {
        tableEmployees.addRow(randomEmployee);
      });
    }
    employees.computeSalaryBudget().then(function(budget) {
      $("#budgetDiv").removeClass("hidden");
      $("#budget").text(budget);
    });

    return new Promise(function(resolve) {
      setTimeout(function() {
        submitSwitch(false, "#generationSubmit", "#generationLoading");
        displayAlertMessage(
          $("#generationAlert"),
          `generation ${params.employeesCount} employees complete!`,
          "alert-success"
        );
        resolve();
      }, 1000);
    });
  } else {
    return new Promise(function(resolve) {
      setTimeout(function() {
        submitSwitch(false, "#generationSubmit", "#generationLoading");
        displayAlertMessage($("#generationAlert"), result, "alert-warning");
        resolve(result);
      }, 1000);
    });
  }
});
