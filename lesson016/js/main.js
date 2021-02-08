const employeeForm = new FormHandler("#employeeForm");
const thead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");

const tableEmployees = new Table(
  ["id", "emailAddress", "gender", "name", "salary", "title"],
  thead,
  tableBody
);

const employees = new Employees();

employeeForm.addHandler(function(employee) {
  const result = employees.addEmployee(employee);
  var $employeeDiv = $("#employeeDiv");

  function hideEmployeeDiv() {
    $employeeDiv.fadeToggle(1000);
  }
  $employeeDiv.removeClass("hidden alert-danger alert-success");
  if (!result) {
    $employeeDiv.addClass("alert-danger");
    $employeeDiv.text(`employee with ${employee.id} already exist!`);
    hideEmployeeDiv();
    setTimeout(hideEmployeeDiv, 3000);
    return `employee with ${employee.id} already exist!`;
  }
  $employeeDiv.addClass("alert-success");
  $employeeDiv.text(`employee with ${employee.id} added successfully!`);
  tableEmployees.addRow(employee);
  $("#budgetDiv").removeClass("hidden");
  $("#budget").text(employees.computeSalaryBudget());
  setTimeout(hideEmployeeDiv, 3000);
});
