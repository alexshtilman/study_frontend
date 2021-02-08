import React, { useState, useEffect } from "react";
import "./table.css";
import generateRandomEmployee from "../functions/random";
function Table(props) {
  const [state, setState] = useState({
    persons: []
  });
  const generatePerson = () => {
    const newPerson = generateRandomEmployee(
      state.persons.length + 1,
      5000,
      35000
    );
    const persons = state.persons;
    persons.unshift(newPerson);
    setState({
      persons
    });
  };
  useEffect(() => {
    let intervalId = setInterval(generatePerson, 3000);
  }, []);
  return (
    <div className="col-sm-10">
      <div className="card">
        <div className="card-header">
          <h2>Show employees</h2>
        </div>
        <div className="card-body">
          <div className="tableWrap">
            <table className="table table-bordered table-striped ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>emailAddress</th>
                  <th>name</th>
                  <th>gender</th>
                  <th>salary</th>
                  <th>title</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {state.persons.map(person => {
                  return (
                    <tr key={person.id}>
                      <td>{person.id}</td>
                      <td>{person.emailAddress}</td>
                      <td>{person.name}</td>
                      <td>{person.gender}</td>
                      <td>{person.salary}</td>
                      <td>{person.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Table;
