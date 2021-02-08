import AppFireBase from "../../config/firebase";
import "firebase/firestore";
import { collectionData } from "rxfire/firestore";
export default class EmployeesFireBaseHttpService {
  constructor(collection) {
    this.db = AppFireBase.firestore().collection(collection);
  }
  getEmployees() {
    return collectionData(this.db);
  }
  addEmployee(employee) {
    return this.db.doc(employee.emailAddress).set(employee);
  }
  handleUpdateEmployee(emailAddress, employee) {
    return this.db.doc(emailAddress).set(employee);
  }
  deleteEmployee(emailAddress) {
    return this.db.doc(emailAddress).delete();
  }
}
