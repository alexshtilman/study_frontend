import React from "react";

import generateRandomEmployee from "../functions/random";

import _ from "lodash";

import EmployeeForm from "./EmployeeForm";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeDelete from "./EmployeeDelete";
import EmployeesList from "./EmployeesList";
import { Context } from "../common/context";
import CONFIG from "../config.json";

function Employees() {
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState("");
  const {
    handleUpdate,
    handleToast,
    employees,
    useSort,
    sortUsed,
  } = React.useContext(Context);

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
  const updateEmployee = () => {
    handleUpdate(employees);
  };
  const handleUpdateEmployee = (employee) => {
    let emptyRate = [];
    for (let i = 0; i < CONFIG.defaultMaxRate; i++) emptyRate[i] = 0;

    const employeesThis = employees;
    const ind = employeesThis.findIndex(
      (e) => e.id === parseInt(employee.id.value)
    );
    if (ind >= 0) {
      const emp = {
        id: parseInt(employee.id.value),
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
      updateEmployee();
      handleToast(`Employee with id ${employee.id.value} updated`);
      return false;
    } else {
      handleToast(`Employee with id ${employee.id.value} not found`);
      return `employee with id ${employee.id.value} not found`;
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
      updateEmployee();
      handleToast(`Employee with id ${newEmployee.id.value} added`);
      return false;
    } else {
      handleToast(`Employee with id ${newEmployee.id.value} already exist`);
      return `employee with id ${newEmployee.id.value} already exist`;
    }
  };
  const generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    const employeesThis = employees;

    const ind = employeesThis.findIndex((e) => e.id === newPerson.id);
    if (ind < 0) {
      employeesThis.push(newPerson);
      updateEmployee();
      handleToast(`Employee with id ${newPerson.id} generated...`);
    } else generateEmployee(min, max);
  };
  const deleteEmployee = () => {
    let newEmployees = employees;
    _.remove(newEmployees, (employee) => employee.id === selectedEmployee);
    handleToast(`Employee with id ${selectedEmployee} deleted...`);
    setOpen(false);
    updateEmployee();
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
