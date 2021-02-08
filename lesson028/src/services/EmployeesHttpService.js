import { Axios } from "axios-observable";
import { map } from "rxjs/operators";

export default class EmployeesHttpService {
  constructor(url) {
    if (!url) throw Error("url is missing!");
    this.url = url;
  }

  getEmployees() {
    return Axios.get(this.url).pipe(map((response) => response.data));
  }
  getSelectedEmployee(employeeId) {
    return Axios.get(this.url + employeeId);
  }
  addEmployee(newEmployee) {
    return Axios.post(this.url, newEmployee);
  }
  handleUpdateEmployee(id, employee) {
    return Axios.patch(this.url + id, employee);
  }
  deleteEmployee(employeeId) {
    return Axios.delete(this.url + employeeId);
  }
}
