import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
import CONFIG from "../validationConfig.json";

export default class EmployeesNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "/lesson025",
    };
    this.updateActive = this.updateActive.bind(this);
  }
  updateActive = (link) => {
    this.setState({
      active: link,
    });
  };
  render() {
    return (
      <div className="row justify-content-md-center mt-2">
        <nav className="navbar navbar-expand-lg navbar-light bg-light col-sm-8 mb-2">
          <Link
            className="navbar-brand"
            to={"/lesson025"}
            onClick={() => this.updateActive("/lesson025")}
          >
            <FontAwesomeIcon
              spin={this.state.active === "/lesson025" ? true : false}
              icon={faVirus}
              size="2x"
              color="red"
            />
          </Link>
          <ul className="navbar-nav mr-auto">
            {CONFIG.navigationLinks.map((item, index) => (
              <li
                className={
                  this.state.active === item.link
                    ? "nav-item active"
                    : "nav-item"
                }
                key={`index-${index}`}
              >
                <Link
                  className="nav-item nav-link"
                  to={item.link}
                  onClick={() => this.updateActive(item.link)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
