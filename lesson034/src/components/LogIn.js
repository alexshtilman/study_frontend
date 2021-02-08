import React from "react";
import CONFIG from "../config/config.json";
import { Context } from "../common/context";
import InputTextElement from "../common/InputTextElement";

export default function LogIn() {
  const { authService } = React.useContext(Context);
  const [noConnection, setNoConnection] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState({
    value: "",
    hasError: 0,
  });
  const [password, setPassword] = React.useState({
    value: "",
    hasError: 0,
  });
  const handleEmailChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setEmailAddress({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (mailFormat.test(e.target.value)) {
        setEmailAddress({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setEmailAddress({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };
  const onGoggleAuth = () => {
    authService.logIn();
  };
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setPassword({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      setPassword({
        value: e.target.value,
        hasError: -1,
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    authService
      .logIn({ email: emailAddress.value, password: password.value })
      .then()
      .catch(() => {
        setNoConnection("Wrong login or password!");
      });
    /*
      .subscribe(
        () => callBackSetUserData(),
        (error) => {
          if (error.response) {
            if (error.response.status === 400)
              setNoConnection("Wrong login or password!");
          } else {
            setNoConnection("Connection error server is down!");
          }
        }
      );*/
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2>Welcome to homework {" " + CONFIG.homeDirTitle}</h2>
      </div>
      <div className="card-body">
        <div className="pb-5"></div>
        <h1 style={{ textAlign: "center" }}>Please enter email and password</h1>
        <div className="col-xl-3  col-sm-12  offset-lg-4 offset-md-4 mt-5">
          <form id="employeeForm" onSubmit={submitHandler}>
            <div className="row">
              <InputTextElement
                name="emailAddress"
                title="Email"
                css="form-group col-xl-12 col-sm-12"
                hasError={emailAddress.hasError}
                handleChange={handleEmailChange}
                value={emailAddress.value}
                invalidText={`Please type an correct email)`}
              />
            </div>
            <div className="row">
              <InputTextElement
                name="password"
                title="password"
                css="form-group col-xl-12 col-sm-12"
                hasError={password.hasError}
                handleChange={handleChange}
                value={password.value}
                type={true}
                invalidText={`Please type an correct password digits)`}
              />
            </div>
            <div style={{ textAlign: "end" }}>
              <button className="btn btn-success m-2" type="submit">
                Log in
              </button>
              <button className="btn btn-success m-2" onClick={onGoggleAuth}>
                Google
              </button>
            </div>
          </form>
          {noConnection ? (
            <div className="alert alert-danger">{noConnection}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
