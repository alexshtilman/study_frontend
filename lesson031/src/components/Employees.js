import React from "react";

import generateRandomEmployee from "../functions/random";

import EmployeeForm from "./EmployeeForm";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeDelete from "./EmployeeDelete";
import EmployeesList from "./EmployeesList";

import { Context } from "../common/context";
import CONFIG from "../config.json";

import useSubscribeEffect from "../services/useSubscribeEffect";
function Employees() {
  const {
    employeesService,
    handleToast,
    userData,
    callBacksetNoConnection,
    noConnection,
  } = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");

  const [employees] = useSubscribeEffect(
    employeesService,
    employeesService.getEmployees,
    callBacksetNoConnection
  );

  const [sortUsed, setSortUsed] = React.useState("");
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

  const handleUpdateEmployee = async (employee) => {
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
      try {
        await employeesService
          .handleUpdateEmployee(employee.id.value, emp)
          .toPromise();
        handleToast(`Employee  updated`);
        return false;
      } catch (error) {
        handleToast(`Employee  not found`);
        return `employee  not found`;
      }
    } else {
      handleToast(`Employee  not found`);
      return `employee  not found`;
    }
  };

  const addEmployee = (newEmployee) => {
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
        employeesService.addEmployee(emp).then(() => {
          handleToast(`Employee with id ${newEmployee.id.value} added`);
        });
        return false;
      } catch (error) {
        console.log(error);
        handleToast(`Employee with id ${newEmployee.id.value} already exist`);
        return `employee with id ${newEmployee.id.value} already exist`;
      }
    } else {
      console.log("aaa");
      return `employee with id ${newEmployee.id.value} already exist`;
    }
  };
  const generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    try {
      employeesService.addEmployee(newPerson).then(() => {
        handleToast(`Employee with id ${newPerson.id} added`);
      });
    } catch (error) {
      handleToast(`Employee with id ${newPerson.id} already exist`);
    }
  };
  const deleteEmployee = () => {
    try {
      employeesService.deleteEmployee(selectedEmployee).then(() => {
        handleToast(`Employee deleted...`);
        setOpen(false);
      });
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
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
        userData,
        useSort,
        addEmployee,
        handleUpdateEmployee,
        handleUpdateForm,
        handleDeleteEmployee,
        deleteEmployee,
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
