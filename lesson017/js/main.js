function displayAlertMessage(elementSelector, text, className) {
  elementSelector.text(text);
  elementSelector.addClass(className);
  elementSelector.fadeIn(400);
  setTimeout(function() {
    elementSelector.fadeOut(1000);
  }, 3000);
}

const employeeForm = new FormHandler("#employeeForm");
const employeeGenerateForm = new FormHandler("#generation");

const employees = new Employees();
const tableEmployees = new Table(
  ["id", "emailAddress", "gender", "name", "salary", "title"],
  "#tableHead",
  "#tableBody",
  "id",
  function(id) {
    employees.removeEmployee(id);
    $("#budget").text(employees.budget);
    displayAlertMessage(
      $("#employeeTable"),
      `employee with id ${id} was deleted successfully!`,
      "alert-success"
    );
    employees.computeSalaryBudget();
  }
);

employeeForm.addHandler(function(employee) {
  const result = employees.addEmployee(employee);
  var $employeeDiv = $("#employeeDiv");
  $employeeDiv.removeClass("hidden alert-danger alert-success");
  if (!result) {
    displayAlertMessage(
      $employeeDiv,
      `employee with ${employee.id} already exist!`,
      "alert-danger"
    );
    return `employee with ${employee.id} already exist!`;
  }
  displayAlertMessage(
    $employeeDiv,
    `employee with ${employee.id} added successfully!`,
    "alert-success"
  );

  tableEmployees.addRow(employee);
  employees.computeSalaryBudget();
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
  if (result === "ok") {
    employees.clear();
    tableEmployees.clear();
    /** random data Arrays */
    const nameArray = [
      "Vasya",
      "Petya",
      "Kolya",
      "Masha",
      "Sergey",
      "Dasha",
      "Lena",
      "Yura",
      "Igor",
      "Sveta",
      "Sasha"
    ];
    const domainArray = [
      "@gmail.com",
      "@mail.ru",
      "@test.pro",
      "@tel-ran.co.il",
      "@gov.il",
      "@yahoo.com"
    ];
    const genderArray = ["m", "f"];
    const wageArray = [
      "WageEmployee",
      "Manager",
      "SalesPerson",
      "SalesManager"
    ];
    /** random data Arrays */
    const minIdLength = Math.pow(10, params.idLength - 1);
    const maxIdLength = Math.pow(10, params.idLength) - 1;
    for (let i = 0; i < params.employeesCount; i++) {
      let randomId = "";
      while (true) {
        randomId = getRandomNumber(+minIdLength, +maxIdLength);
        if (!employees[randomId]) break;
      }
      let name = getRandomElement(nameArray);
      let randomEmployee = {
        id: randomId,
        name: name,
        emailAddress: name.toLowerCase() + getRandomElement(domainArray),
        gender: getRandomElement(genderArray),
        title: getRandomElement(wageArray),
        salary: getRandomNumber(+params.minSalary, +params.maxSalary)
      };
      employees.addEmployee(randomEmployee);
      tableEmployees.addRow(randomEmployee);
    }
    displayAlertMessage(
      $("#generationAlert"),
      `generation ${params.employeesCount} employees complete!`,
      "alert-success"
    );
    employees.computeSalaryBudget();
  } else {
    displayAlertMessage($("#generationAlert"), result, "alert-warning");
    return result;
  }
});
