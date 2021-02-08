import { Axios } from "axios-observable";
import { map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import CONFIG from "../../config.json";
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
      mergeMap((response) => {
        localStorage.setItem(CONFIG.accessToken, response.data.accessToken);
        return this.getUserData();
      })
    );
  }
  logOut() {
    try {
      localStorage.removeItem(CONFIG.accessToken);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  getUserData() {
    try {
      const jwt = localStorage.getItem(CONFIG.accessToken);
      if (!jwt) return of({});
      const jwtBody = JSON.parse(atob(jwt.split(".")[1]));
      const userName = jwtBody.email;
      let isAdmin = false;

      const now = new Date() / 1000;

      if (now > jwtBody.exp) {
        this.logOut();
        return of({});
      }
      return Axios.get(this.url + "administrators").pipe(
        map((response) => {
          if (response.data && response.data.length > 0) {
            response.data.indexOf(userName) >= 0
              ? (isAdmin = true)
              : (isAdmin = false);
          }
          return { userName, isAdmin };
        })
      );
    } catch (error) {
      console.log(JSON.stringify(error));
      return of({});
    }
  }
}
