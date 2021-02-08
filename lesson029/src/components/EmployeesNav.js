import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

import CONFIG from "../config.json";
function EmployeesNav() {
  const [active, setActive] = React.useState(CONFIG.homeDir);

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
      <ul className="navbar-nav mr-auto">
        {CONFIG.navigationLinks.map((item, index) => (
          <li
            className={active === item.link ? "nav-item active" : "nav-item"}
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
        ))}
      </ul>
    </nav>
  );
}
export default EmployeesNav;
