import React, { useEffect } from "react";
import EmployeesTable from "./EmployeesTable";
import generateRandomEmployee from "../functions/random";
import MyModal from "./MyModal";
import _ from "lodash";
import EmployeeForm from "./EmployeeForm";

import CONFIG from "../config.json";
import EmployeeUpdate from "./EmployeeUpdate";

function Employees(props) {
  const [employees, setEmployees] = React.useState(props.employees);
  const [max, setMax] = React.useState(1);
  const [addForm, setAddFrom] = React.useState(false);
  const [updateForm, setUpdateFrom] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");
  const [selectedEmployee, setSelectedEmployee] = React.useState("");

  const handleShowForm = () => {
    setAddFrom(addForm ? false : true);
    setUpdateFrom(false);
  };
  const handleUpdateForm = (employee) => {
    setSelectedEmployee(employee);
    setUpdateFrom(updateForm ? false : true);
    setAddFrom(false);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedId("");
  };
  const updateEmployee = () => {
    props.handleUpdate(employees);
  };
  const handleUpdateEmployee = (employee) => {
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
        rate: employee.rate.value || 5,
        stars: employee.rate.stars || [0, 0, 0, 0, 0],
      };
      employeesThis[ind] = emp;
      setEmployees(employeesThis);
      setOpen(false);
      setMax(max + 1);
      updateEmployee();
      props.handleToast(`Employee with id ${employee.id.value} updated`);
      return false;
    } else {
      props.handleToast(`Employee with id ${employee.id.value} not found`);
      return `employee with id ${employee.id.value} not found`;
    }
  };
  const addEmployee = (newEmployee) => {
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
        rate: newEmployee.rate.value || 5,
        stars: newEmployee.rate.stars || [0, 0, 0, 0, 0],
      };
      employeesThis.unshift(emp);
      setEmployees(employeesThis);
      setOpen(false);
      setMax(max + 1);
      updateEmployee();
      props.handleToast(`Employee with id ${newEmployee.id.value} added`);
      return false;
    } else {
      props.handleToast(
        `Employee with id ${newEmployee.id.value} already exist`
      );
      return `employee with id ${newEmployee.id.value} already exist`;
    }
  };
  const generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    const employeesThis = employees;

    const ind = employeesThis.findIndex((e) => e.id === newPerson.id);
    if (ind < 0) {
      employeesThis.unshift(newPerson);
      setEmployees(employeesThis);
      updateEmployee();
      props.handleToast(`Employee with id ${newPerson.id} generated...`);
    } else generateEmployee(min, max);
  };
  const deleteClick = (id) => {
    setOpen(true);
    setSelectedId(id);
  };
  const deleteEmployee = () => {
    let newEmployees = employees;
    _.remove(newEmployees, (employee) => employee.id === selectedId);
    setOpen(false);
    setEmployees(newEmployees);
    props.handleToast(`Employee with id ${selectedId} deleted...`);
    updateEmployee();
  };
  useEffect(() => {
    setUpdateFrom(false);
    setAddFrom(false);
  }, []);

  const callBackRate = (rate, id) => {
    let employeesThis = employees;
    const ind = employeesThis.findIndex((e) => e.id === parseInt(id));
    let stars = [0, 0, 0, 0, 0];
    for (let i = rate; i < 5; i++) stars[i] = 1;
    employeesThis[ind].rate = rate;
    employeesThis[ind].stars = stars.reverse();
    setEmployees(employeesThis);
    updateEmployee();
  };

  return (
    <React.Fragment>
      {addForm ? (
        <EmployeeForm
          employees={employees}
          handleUpdate={updateEmployee}
          showAddEmployee={handleShowForm}
          addEmployee={addEmployee}
        />
      ) : updateForm ? (
        <EmployeeUpdate
          employee={selectedEmployee}
          handleUpdate={handleUpdateEmployee}
          handleUpdateForm={handleUpdateForm}
        />
      ) : (
        <React.Fragment>
          <div className="card">
            <div className="card-header">
              <h2>Show employees</h2>
            </div>
            <div className="card-body">
              <div className="tableWrap">
                <EmployeesTable
                  employees={employees}
                  deleteClick={deleteClick}
                  updateClick={handleUpdateForm}
                  callBack={callBackRate}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
          <div className=" mt-2 mb-2">
            <div className="card">
              <div className="card-header" style={{ textAlign: "end" }}>
                <button
                  className="btn btn-primary m-2"
                  onClick={() =>
                    generateEmployee(
                      CONFIG.formValidationValues.salary.min,
                      CONFIG.formValidationValues.salary.max
                    )
                  }
                >
                  Add random employee
                  <i className="fa fa-random ml-2" />
                </button>
                <button
                  className="btn btn-success m-2"
                  onClick={handleShowForm}
                >
                  Add employee
                  <i className="fa fa-plus-circle ml-2" />
                </button>
              </div>
            </div>
          </div>
          <MyModal
            open={open}
            onHide={handleClose}
            callBack={deleteEmployee}
            handleClose={handleClose}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default Employees;
