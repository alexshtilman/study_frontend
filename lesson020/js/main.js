const employeeForm = new FormHandler("#employeeForm");
const URL = "http://localhost:3000/persons/";
var $employeeDiv = $("#employeeDiv");
var prevState; // uses for polling
var pollingState = false;
var $statusText = $("#statusText");
var $alertDiv = $("#alertDiv");
const employeeGenerateForm = new FormHandler("#generation");
const generationProgress = new ProgressBar("#progressDiv", "#progress");

const employees = new Employees(URL);
const tableEmployees = new Table(
  ["id", "emailAddress", "gender", "name", "salary", "title"],
  "#tableHead",
  "#tableBody",
  "id",
  function(id) {
    employees.removeEmployee(id);
  }
);
function showAlertMessage(resText, status) {
  submitSwitch(false, "#addEmployeeSubmit", "#addEmployeeLoading");
  displayAlertMessage(
    $alertDiv,
    resText,
    status ? "alert-success" : "alert-danger"
  );
}
employeeForm.addHandler(function(employee) {
  submitSwitch(true, "#addEmployeeSubmit", "#addEmployeeLoading");
  return employees.addEmployee(employee);
}, showAlertMessage);

employeeGenerateForm.addHandler(function(params) {
  submitSwitch(true, "#generationSubmit", "#generationLoading");
  return generateEmployees(params);
}, showAlertMessage);

async function generateEmployees(params) {
  const result = checkFormFields(params);
  if (result === "ok") {
    generationProgress.start(params.employeesCount);
    const minIdLength = Math.pow(10, params.idLength - 1);
    const maxIdLength = Math.pow(10, params.idLength) - 1;
    let i = 0;
    do {
      let emp = generateRandomEmployee(
        params.minSalary,
        params.maxSalary,
        minIdLength,
        maxIdLength
      );
      try {
        let result = await employees.getEmployee(emp.id);
        if (result.resCode == -1) {
          try {
            let addResult = await employees.addEmployee(emp);
            if (addResult.resCode == 1) {
              generationProgress.update(i);
              tableEmployees.addRow(emp);
              i++;
            }
          } catch (error) {
            displayAlertMessage($alertDiv, error, "alert-danger");
          }
        }
      } catch (error) {
        displayAlertMessage($alertDiv, error, "alert-danger");
      }
    } while (i < params.employeesCount);

    submitSwitch(false, "#generationSubmit", "#generationLoading");
    displayAlertMessage(
      $alertDiv,
      `generation ${params.employeesCount} employees complete!`,
      "alert-success"
    );
    generationProgress.stop();
    return {
      resCode: 1,
      resText: `generation ${params.employeesCount} employees complete!`
    };
  } else {
    submitSwitch(false, "#generationSubmit", "#generationLoading");
    displayAlertMessage($alertDiv, result, "alert-warning");
    return result;
  }
}
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
function displayAlertMessage(elementSelector, text, className) {
  elementSelector.text(text);
  elementSelector.removeClass("alert-danger alert-success alert-warning");
  elementSelector.addClass(className);
  elementSelector.fadeIn(500);
  setTimeout(function() {
    elementSelector.fadeOut(500);
  }, 3000);
}
function hideAlertMessage(elementSelector) {
  elementSelector.fadeOut(500);
}
function displayConnectionLost(text) {
  tableEmployees.clear();
  $("#budgetDiv").addClass("hidden");
  $statusText.text("connection lost...");
  console.log(text);
  prevState = undefined;
}
async function getEmployees() {
  try {
    const dataFromServer = await employees.getAllEmployees();
    if (dataFromServer.resCode == 1) {
      const currentState = JSON.stringify(dataFromServer.data);
      if (!prevState || currentState != prevState) {
        tableEmployees.clear();
        dataFromServer.data.forEach(function(emp) {
          tableEmployees.addRow(emp);
        });
        const getBudget = await employees.computeSalaryBudget();
        if (getBudget.resCode == 1) {
          $("#budgetDiv").removeClass("hidden");
          $("#budget").text(getBudget.data);
          hideAlertMessage($("#employeeTable"));
          $statusText.text("polling...");
        } else {
          displayConnectionLost(dataFromServer.resText);
        }
        $statusText.text("stand by...");
        prevState = currentState;
      } else {
        $statusText.text("stand by...");
      }
    } else {
      displayConnectionLost(dataFromServer.resText);
    }
  } catch (error) {
    displayConnectionLost(error);
  }
}

$("#employeeShowTab").on("click", function() {
  if (!pollingState) {
    $statusText.text("polling...");
    pollingState = setInterval(getEmployees, 1000);
  }
});
$("#employeeGenerateTab").on("click", function() {
  $statusText.text("");
  clearInterval(pollingState);
  pollingState = false;
});
$("#employeeFormTab").on("click", function() {
  $statusText.text("");
  clearInterval(pollingState);
  pollingState = false;
});
