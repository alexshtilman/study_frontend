import { Axios } from "axios-observable";
import { map } from "rxjs/operators";
import CONFIG from "../config.json";
export default class AuthJwtService {
  constructor(url) {
    if (!url) throw Error("url is missing!");
    this.url = url;
  }
  setUsers(users) {
    Axios.get(this.url + "users")
      .pipe(map((response) => response.data))
      .subscribe((data) => {
        if (!data || data.length === 0) {
          users.forEach((user) => {
            Axios.post(`${this.url}register`, user).subscribe();
          });
        }
      });
  }
  logIn(credentials) {
    return Axios.post(`${this.url}login`, credentials).pipe(
      map((response) => response.data.accessToken)
    );
  }
  logOut() {
    try {
      localStorage.removeItem(CONFIG.accessToken);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  getLogin() {
    try {
      const jwt = localStorage.getItem(CONFIG.accessToken);
      if (!jwt) return "";
      const jwtBody = JSON.parse(atob(jwt.split(".")[1]));
      const now = new Date() / 1000;

      if (now > jwtBody.exp) {
        this.logOut();
        return "";
      }
      return jwtBody.email;
    } catch (error) {
      console.log(JSON.stringify(error));
      return "";
    }
  }
}
