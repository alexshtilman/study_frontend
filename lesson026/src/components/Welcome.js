import React from "react";

export default function Welcome() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Welcome to homework lesson 026</h2>
      </div>
      <div className="card-body" style={{ textAlign: "center" }}>
        <div className="pb-5"></div>
        <h1>You a welcome to inspect each tab.</h1>
        <div className="pb-5"></div>
        <p>
          Source code you can find{" "}
          <a
            href="https://github.com/alexshtilman/lesson026"
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}
