import React, { useEffect } from "react";
import _ from "lodash";
import NoData from "../common/NoData";
import { Context } from "../common/context";

export default function TitleStatistics() {
  const [statisticsArray, setStatisticsArray] = React.useState([]);
  const { employees } = React.useContext(Context);

  useEffect(() => {
    const statisticsObj = _.countBy(employees, "title");
    const statisticsArray = Object.entries(statisticsObj).map((e) => {
      return { title: e[0], count: e[1] };
    });
    setStatisticsArray(statisticsArray);
  }, [employees]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Title statistics</h2>
      </div>
      <div className="card-body">
        {statisticsArray.length > 0 ? (
          <div className="tableWrap">
            <table className="table table-bordered table-striped ">
              <thead>
                <tr>
                  <th>title</th>
                  <th>count</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {statisticsArray.map((stat) => {
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
  );
}
