import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
import CONFIG from "../config.json";
const homeDir = CONFIG.homeDir;
const navigationLinks = CONFIG.navigationLinks;

function EmployeesNav() {
  const [active, setActive] = React.useState(homeDir);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        className="navbar-brand"
        to={homeDir}
        onClick={() => setActive(homeDir)}
      >
        <FontAwesomeIcon
          spin={active === homeDir ? true : false}
          icon={faVirus}
          size="2x"
          color="red"
        />
      </Link>
      <ul className="navbar-nav mr-auto">
        {navigationLinks.map((item, index) => (
          <li
            className={active === item.link ? "nav-item active" : "nav-item"}
            key={`index-${index}`}
          >
            <Link
              className="nav-item nav-link"
              to={homeDir + item.link}
              onClick={() => {
                setActive(homeDir + item.link);
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
