import React, { Component } from "react";
import _ from "lodash";
import NoData from "./NoData";

export default class TitleStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statisticsArray: [],
    };
  }

  componentDidMount() {
    const statisticsObj = _.countBy(this.props.employees, "title");
    const statisticsArray = Object.entries(statisticsObj).map((e) => {
      return { title: e[0], count: e[1] };
    });
    this.setState({
      statisticsArray: statisticsArray,
    });
  }
  render() {
    return (
      <div className="col-sm-8">
        <div className="card">
          <div className="card-header">
            <h2>Title statistics</h2>
          </div>
          <div className="card-body">
            {this.state.statisticsArray.length > 0 ? (
              <div className="tableWrap">
                <table className="table table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>title</th>
                      <th>count</th>
                    </tr>
                  </thead>
                  <tbody id="tableBody">
                    {this.state.statisticsArray.map((stat) => {
                      return (
                        <tr key={stat.title}>
                          <td>{stat.title}</td>
                          <td>{stat.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    );
  }
}
