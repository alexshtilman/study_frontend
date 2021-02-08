import "./App.css";
import Employees from "./components/Employees";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <main>
        <br />
        <section>
          <div className="row justify-content-md-center">
            <Employees />
          </div>
        </section>
      </main>
    );
  }
}
