import React, { useEffect } from "react";
import _ from "lodash";
import NoData from "../common/NoData";
import { Context } from "../common/context";
import CONFIG from "../config.json";
export default function TitleStatistics() {
  const [statisticsArray, setStatisticsArray] = React.useState([]);
  const { employeesService } = React.useContext(Context);
  const [noConnection, setNoConnection] = React.useState("");
  let subscription;
  const getEmployees = () => {
    subscription = employeesService.getEmployees().subscribe(
      (response) => {
        if (response) {
          if (response.length > 0) {
            setNoConnection("");
            const statisticsObj = _.countBy(response, "title");
            const statisticsArray = Object.entries(statisticsObj).map((e) => {
              return { title: e[0], count: e[1] };
            });
            setStatisticsArray(statisticsArray);
          } else setStatisticsArray([]);
        } else setStatisticsArray([]);
      },
      (error) => {
        setNoConnection(
          `\nConnection to JSON server refused!\n\n\nCheck that ${CONFIG.jsonUrl} is running!`
        );
      }
    );
  };

  useEffect(() => {
    let pollingState = setInterval(getEmployees, 1000);
    return () => {
      clearInterval(pollingState);
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, []);

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
        ) : noConnection ? (
          <div className="alert alert-danger">{noConnection}</div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
