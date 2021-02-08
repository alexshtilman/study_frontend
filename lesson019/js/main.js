const employeeForm = new FormHandler("#employeeForm");
var $employeeDiv = $("#employeeDiv");
const employeeGenerateForm = new FormHandler("#generation");
const generationProgress = new ProgressBar("#progressDiv", "#progress");

const employees = new Employees();
const tableEmployees = new Table(
  ["id", "emailAddress", "gender", "name", "salary", "title"],
  "#tableHead",
  "#tableBody",
  "id",
  function(id) {
    return deleteEmployeeById(id);
  }
);
employeeForm.addHandler(function(employee) {
  submitSwitch(true, "#addEmployeeSubmit", "#addEmployeeLoading");
  return submitEmployee(employee);
});

employeeGenerateForm.addHandler(function(params) {
  submitSwitch(true, "#generationSubmit", "#generationLoading");
  return generateEmployees(params);
});
function checkFormFields(params) {
  let errorCode = 0;
  if (+params.employeesCount < 0 || +params.employeesCount > 100) errorCode = 1;
  if (+params.idLength < 0 + params.idLength > 5) errorCode = 2;
  if (+params.minSalary < 0) errorCode = 3;
  if (+params.maxSalary < 0) errorCode = 4;
  if (+params.maxSalary < +params.minSalary) errorCode = 5;
  if (
    +params.employeesCount >
    Math.pow(10, params.idLength) - Math.pow(10, params.idLength - 1)
  )
    errorCode = 6;
  switch (errorCode) {
    case 1: {
      return "Wrong number of employees";
    }
    case 2: {
      return "Wrong number of digits for ID";
    }
    case 3: {
      return "Wrong min salary";
    }
    case 4: {
      return "Wrong max salary";
    }
    case 5: {
      return "Max salary should be greater then min salary";
    }
    case 6: {
      return `Can not generate ${
        params.employeesCount
      } employees width unique id of ${
        params.idLength
      } digits, maximum employee count for ${
        params.idLength
      } digit is ${Math.pow(10, params.idLength) -
        Math.pow(10, params.idLength - 1)} `;
    }
    default: {
      return "ok";
    }
  }
}
function submitSwitch(status, submitSelector, loadingSelector) {
  if (status) {
    $(loadingSelector).removeClass("hidden");
    $(submitSelector).addClass("hidden");
  } else {
    $(loadingSelector).addClass("hidden");
    $(submitSelector).removeClass("hidden");
  }
}
async function submitEmployee(employee) {
  let message = await employees.addEmployee(employee);
  if (!message) {
    displayAlertMessage(
      $employeeDiv,
      `employee with ${employee.id} already exist!`,
      "alert-danger"
    );
    submitSwitch(false, "#addEmployeeSubmit", "#addEmployeeLoading");
    return `employee with ${employee.id} already exist!`;
  } else {
    tableEmployees.addRow(employee);
    displayAlertMessage(
      $employeeDiv,
      `employee with ${employee.id} added successfully!`,
      "alert-success"
    );
    let budget = await employees.computeSalaryBudget();
    $("#budgetDiv").removeClass("hidden");
    $("#budget").text(budget);
    submitSwitch(false, "#addEmployeeSubmit", "#addEmployeeLoading");
    return "";
  }
}
async function deleteEmployeeById(id) {
  submitSwitch(true, "#confirmSubmit", "#confirmLoading");
  await employees.removeEmployee(id);
  $("#loadingBudget").removeClass("hidden");
  $("#budget").addClass("hidden");
  $("#modalDiv").modal("hide");

  let budget = await employees.computeSalaryBudget();
  displayAlertMessage(
    $("#employeeTable"),
    `employee with id ${id} was deleted successfully!`,
    "alert-success"
  );
  submitSwitch(false, "#confirmSubmit", "#confirmLoading");
  $("#budget").removeClass("hidden");
  $("#budget").text(budget);
  $("#loadingBudget").addClass("hidden");
}

async function generateEmployees(params) {
  const result = checkFormFields(params);
  if (result === "ok") {
    employees.clear();
    tableEmployees.clear();
    appendToLog("start generation", true);
    generationProgress.start(params.employeesCount);
    const minIdLength = Math.pow(10, params.idLength - 1);
    const maxIdLength = Math.pow(10, params.idLength) - 1;
    do {
      let emp = generateRandomEmployee(
        params.minSalary,
        params.maxSalary,
        minIdLength,
        maxIdLength
      );
      let result = await employees.addEmployee(emp);
      if (!result) {
        appendToLog(`employee ${emp.id} already exist...`, false);
      } else {
        generationProgress.update(employees.empLength);
        tableEmployees.addRow(emp);
        appendToLog(`employee ${emp.id} was added...`, true);
      }
    } while (employees.empLength < params.employeesCount);
    let budget = await employees.computeSalaryBudget();
    $("#budgetDiv").removeClass("hidden");
    $("#budget").text(budget);
    submitSwitch(false, "#generationSubmit", "#generationLoading");
    appendToLog("end generation", true);
    displayAlertMessage(
      $("#generationAlert"),
      `generation ${params.employeesCount} employees complete!`,
      "alert-success"
    );
    generationProgress.stop();
    return "";
  } else {
    submitSwitch(false, "#generationSubmit", "#generationLoading");
    displayAlertMessage($("#generationAlert"), result, "alert-warning");
    return result;
  }
}
function displayAlertMessage(elementSelector, text, className) {
  elementSelector.text(text);
  elementSelector.addClass(className);
  elementSelector.fadeIn(400);
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(elementSelector.fadeOut(1000));
    }, 5000);
  });
}
function appendToLog(textData, status) {
  let d = new Date();
  const $logElement = $("<div>", {
    text: d.getMilliseconds() + " : " + textData,
    class: status ? "alert alert-primary" : "alert alert-danger"
  });
  $("#log").prepend($logElement);
}
