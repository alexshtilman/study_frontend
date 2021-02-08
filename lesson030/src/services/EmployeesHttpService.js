import { Axios } from "axios-observable";
import { map } from "rxjs/operators";
import CONFIG from "../config.json";
export default class EmployeesHttpService {
  constructor(url) {
    if (!url) throw Error("url is missing!");
    this.url = url;
  }

  getEmployees() {
    const jwt = localStorage.getItem(CONFIG.accessToken);
    return Axios.get(this.url, {
      headers: { Authorization: "Bearer " + jwt },
    }).pipe(map((response) => response.data));
  }
  getSelectedEmployee(employeeId) {
    const jwt = localStorage.getItem(CONFIG.accessToken);
    return Axios.get(this.url + employeeId, {
      headers: { Authorization: "Bearer " + jwt },
    }).toPromise();
  }
  addEmployee(newEmployee) {
    const jwt = localStorage.getItem(CONFIG.accessToken);
    return Axios.post(this.url, newEmployee, {
      headers: { Authorization: "Bearer " + jwt },
    }).toPromise();
  }
  handleUpdateEmployee(id, employee) {
    const jwt = localStorage.getItem(CONFIG.accessToken);
    return Axios.patch(this.url + id, employee, {
      headers: { Authorization: "Bearer " + jwt },
    }).toPromise();
  }
  deleteEmployee(employeeId) {
    const jwt = localStorage.getItem(CONFIG.accessToken);
    return Axios.delete(this.url + employeeId, {
      headers: { Authorization: "Bearer " + jwt },
    }).toPromise();
  }
}
