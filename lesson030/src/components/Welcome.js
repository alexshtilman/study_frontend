import React from "react";
import CONFIG from "../config.json";

export default function Welcome() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Welcome to homework {" " + CONFIG.homeDirTitle}</h2>
      </div>
      <div className="card-body" style={{ textAlign: "center" }}>
        <div className="pb-5"></div>
        <h1>You a welcome to inspect each tab.</h1>
        <div className="pb-5"></div>

        <p>
          Source code you can find{" "}
          <a
            href={`https://github.com/alexshtilman${CONFIG.homeDir}`}
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
