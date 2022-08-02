import React, { useState } from "react";
import "./Analytics.css";

import ChartWrapper from "../../UI/Charts/ChartWrapper";
import LineChart from "../../UI/Charts/LineChart";
import BarChart from "../../UI/Charts/BarChart";
import Breadcrumb from "../../UI/Breadcrumb";
import { UserData } from "../../../Assets/Data";

export default function Analytics() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Loss",
        data: UserData.map((data) => data.userLost),
        backgroundColor: ["#85C1E9"],
        borderColor: "#5DADE2",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="analytics">
      <Breadcrumb prev={"home"} current={"Analytics"} />
      <div className="row">
        <div className="col-lg-6">
          <ChartWrapper>
            <LineChart chartData={userData} />
          </ChartWrapper>
        </div>
        <div className="col-lg-6">
          <ChartWrapper>
            <BarChart chartData={userData} options={options} />
          </ChartWrapper>
        </div>
      </div>
    </div>
  );
}
