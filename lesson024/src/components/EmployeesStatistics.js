import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

export default class EmployeesStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statisticsArray: []
    };
  }

  componentDidMount() {
    const statisticsObj = _.countBy(this.props.employees, "title");
    const statisticsArray = Object.entries(statisticsObj).map(e => {
      return { title: e[0], count: e[1] };
    });
    this.setState({
      statisticsArray: statisticsArray
    });
  }
  render() {
    return (
      <div className="col-sm-4">
        <div className="card">
          <div className="card-header">
            <h2>Employees statistics</h2>
          </div>
          <div className="card-body">
            <div className="tableWrap">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr>
                    <th>title</th>
                    <th>count</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {this.state.statisticsArray.length === 0 ? null : (
                    <React.Fragment>
                      {this.state.statisticsArray.map(stat => {
                        return (
                          <tr key={stat.title}>
                            <td>{stat.title}</td>
                            <td>{stat.count}</td>
                          </tr>
                        );
                      })}
                      <tr></tr>
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>

            <button
              className="btn btn-warning m-2"
              onClick={this.props.showStat}
            >
              Hide Statistics
              <FontAwesomeIcon icon={faBan} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
