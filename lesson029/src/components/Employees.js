import React, { useEffect } from "react";

import generateRandomEmployee from "../functions/random";

import EmployeeForm from "./EmployeeForm";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeDelete from "./EmployeeDelete";
import EmployeesList from "./EmployeesList";

import { Context } from "../common/context";
import CONFIG from "../config.json";

function Employees() {
  const { employeesService, handleToast } = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  const [sortUsed, setSortUsed] = React.useState("");
  const [noConnection, setNoConnection] = React.useState("");

  let subscription;
  const getEmployees = async () => {
    subscription = await employeesService.getEmployees().subscribe(
      (response) => {
        setNoConnection("");
        if (response) {
          if (response.length > 0) setEmployees(response);
          else setEmployees([]);
        } else setEmployees([]);
      },
      (error) => {
        setNoConnection(
          `\nConnection to JSON server refused!\n\n\nCheck that ${CONFIG.jsonUrl} is running!`
        );
      }
    );
  };
  useEffect(() => {
    let pollingState = setInterval(getEmployees, 1000);
    return () => {
      clearInterval(pollingState);
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, []);
  const useSort = (currentSort, order) => {
    if (order === "asc") {
      employees.sort((a, b) => {
        if (a[currentSort] > b[currentSort]) {
          return 1;
        }
        if (a[currentSort] < b[currentSort]) {
          return -1;
        }

        return 0;
      });

      setSortUsed(currentSort + "_" + order);
    } else {
      employees.sort((a, b) => {
        if (a[currentSort] > b[currentSort]) {
          return -1;
        }
        if (a[currentSort] < b[currentSort]) {
          return 1;
        }
        return 0;
      });

      setSortUsed(currentSort + "_" + order);
    }
  };
  const handleShowForm = () => {
    setOpen("addEmployee");
  };

  const handleUpdateForm = (employee) => {
    setSelectedEmployee(employee);
    setOpen("updateEmployee");
  };
  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpen("deleteEmployee");
  };
  const handleClose = () => {
    setSelectedEmployee("");
    setOpen(false);
  };

  const handleUpdateEmployee = (employee) => {
    let emptyRate = [];
    for (let i = 0; i < CONFIG.defaultMaxRate; i++) emptyRate[i] = 0;

    const employeesThis = employees;

    const ind = employeesThis.findIndex((e) => e.id === employee.id.value);

    if (ind >= 0) {
      const emp = {
        id: employee.id.value,
        name: employee.name.value,
        emailAddress: employee.emailAddress.value,
        gender: employee.gender.selected,
        title: employee.title.value,
        salary: parseInt(employee.salary.value),
        rate: employee.rate.value || CONFIG.defaultRate,
        stars: employee.rate.stars || emptyRate,
      };
      employeesThis[ind] = emp;
      setOpen(false);
      employeesService.handleUpdateEmployee(employee.id.value, emp).subscribe(
        () => getEmployees(),
        (error) => {
          alert(JSON.stringify(error));
        }
      );
      handleToast(`Employee  updated`);
      return false;
    } else {
      handleToast(`Employee  not found`);
      return `employee  not found`;
    }
  };

  const addEmployee = async (newEmployee) => {
    let emptyRate = [];
    for (let i = 0; i < CONFIG.defaultMaxRate; i++) emptyRate[i] = 0;

    const employeesThis = employees;
    const ind = employeesThis.findIndex(
      (e) => e.id === parseInt(newEmployee.id.value)
    );

    if (ind < 0) {
      const emp = {
        id: parseInt(newEmployee.id.value),
        name: newEmployee.name.value,
        emailAddress: newEmployee.emailAddress.value,
        gender: newEmployee.gender.selected,
        title: newEmployee.title.value,
        salary: parseInt(newEmployee.salary.value),
        rate: newEmployee.rate.value || CONFIG.defaultRate,
        stars: newEmployee.rate.stars || emptyRate,
      };
      employeesThis.push(emp);
      setOpen(false);
      try {
        await employeesService.addEmployee(emp).toPromise();
        handleToast(`Employee with id ${newEmployee.id.value} added`);
        getEmployees();
        return false;
      } catch (error) {
        handleToast(`Employee with id ${newEmployee.id.value} already exist`);
        return `employee with id ${newEmployee.id.value} already exist`;
      }
    } else {
      return `employee with id ${newEmployee.id.value} already exist`;
    }
  };
  const generateEmployee = async (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    try {
      await employeesService.addEmployee(newPerson).toPromise();
      handleToast(`Employee with id ${newPerson.id} added`);
      getEmployees();
    } catch (error) {
      handleToast(`Employee with id ${newPerson.id} already exist`);
    }
  };
  const deleteEmployee = async () => {
    try {
      await employeesService.deleteEmployee(selectedEmployee).toPromise();
      handleToast(`Employee deleted...`);
      setOpen(false);
      getEmployees();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  const deleteAllEmployee = (employees) => {
    employeesService.deleteAllEmployee(employees).subscribe(
      () => {
        handleToast(`All employees deleted...`);
        setOpen(false);
        getEmployees();
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  };
  const renderForms = (openStatus) => {
    switch (openStatus) {
      case "addEmployee":
        return <EmployeeForm />;
      case "updateEmployee":
        return <EmployeeUpdate />;
      case "deleteEmployee":
        return <EmployeeDelete />;
      default:
        return <EmployeesList />;
    }
  };
  return (
    <Context.Provider
      value={{
        employees,
        selectedEmployee,
        sortUsed,
        CONFIG,
        noConnection,
        useSort,
        addEmployee,
        handleUpdateEmployee,
        handleUpdateForm,
        handleDeleteEmployee,
        deleteEmployee,
        deleteAllEmployee,
        handleShowForm,
        generateEmployee,
        handleClose,
      }}
    >
      {renderForms(open)}
    </Context.Provider>
  );
}
export default Employees;
