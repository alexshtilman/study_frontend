import AppFireBase from "../../config/firebase";
import { docData } from "rxfire/firestore";
import { authState } from "rxfire/auth";
import { map, mergeMap } from "rxjs/operators";
import firebase from "firebase";
import { of } from "rxjs";

export default class authFireBaseService {
  constructor() {
    this.auth = AppFireBase.auth();
  }
  logIn(user) {
    return user ? this.emailAuth(user) : this.googleAuth();
  }
  logOut() {
    return this.auth.signOut();
  }
  emailAuth(user) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  googleAuth() {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(authProvider);
  }
  getUserData() {
    return authState(this.auth).pipe(
      mergeMap((user) => {
        if (!user || !user.email) {
          return of({});
        }
        return docData(
          AppFireBase.firestore().collection("administrators").doc(user.email)
        ).pipe(
          map((admin) => {
            return { userName: user.email, isAdmin: !!admin.email };
          })
        );
      })
    );
  }
}
