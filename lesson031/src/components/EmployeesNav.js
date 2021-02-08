import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../common/context";

import CONFIG from "../config.json";
function EmployeesNav() {
  const [active, setActive] = React.useState(CONFIG.homeDir);
  const { userData, callBackResetUserData, noConnection } = React.useContext(
    Context
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        className="navbar-brand"
        to={CONFIG.homeDir}
        onClick={() => setActive(CONFIG.homeDir)}
      >
        <FontAwesomeIcon
          spin={active === CONFIG.homeDir ? true : false}
          icon={faVirus}
          size="2x"
          color="red"
        />
      </Link>
      {userData.userName ? (
        noConnection === "" ? (
          <React.Fragment>
            <ul className="navbar-nav mr-auto">
              {CONFIG.navigationLinks.map((item, index) =>
                item.isAdmin ? (
                  userData.isAdmin ? (
                    <li
                      className={
                        active === item.link ? "nav-item active" : "nav-item"
                      }
                      key={`index-${index}`}
                    >
                      <Link
                        className="nav-item nav-link"
                        to={CONFIG.homeDir + item.link}
                        onClick={() => {
                          setActive(CONFIG.homeDir + item.link);
                        }}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ) : null
                ) : (
                  <li
                    className={
                      active === item.link ? "nav-item active" : "nav-item"
                    }
                    key={`index-${index}`}
                  >
                    <Link
                      className="nav-item nav-link"
                      to={CONFIG.homeDir + item.link}
                      onClick={() => {
                        setActive(CONFIG.homeDir + item.link);
                      }}
                    >
                      {item.text}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {userData.userName + "  "}
            <Link
              className={"ml-2"}
              onClick={callBackResetUserData}
              to={CONFIG.homeDir}
            >
              <FontAwesomeIcon color="green" size="lg" icon={faSignOutAlt} />
            </Link>
          </React.Fragment>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className={"nav-item active"} key={`index`}>
              <Link
                className="nav-item nav-link"
                to={CONFIG.homeDir + "login/"}
                onClick={() => {
                  callBackResetUserData();
                  setActive(CONFIG.homeDir + "login/");
                }}
              >
                Log in
              </Link>
            </li>
          </ul>
        )
      ) : (
        <React.Fragment>
          <ul className="navbar-nav mr-auto">
            <li className={"nav-item active"} key={`index`}>
              <Link
                className="nav-item nav-link"
                to={CONFIG.homeDir + "login/"}
                onClick={() => {
                  setActive(CONFIG.homeDir + "login/");
                }}
              >
                Log in
              </Link>
            </li>
          </ul>
        </React.Fragment>
      )}
    </nav>
  );
}
export default EmployeesNav;
