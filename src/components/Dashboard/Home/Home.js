import React from "react";
import "./Home.css";

import DataItem from "../../UI/DataItem";
import List from "../../UI/List";
import Skeleton from "../../UI/Skeleton";

export default function Home({ appointments, fetchAppointments, isLoading }) {
  return (
    <div className="home-section">
      <div className="row w-100">
        <div className="col-lg-3">
          <DataItem color={"#1ABC9C"}>
            <h6>Total Appointments</h6>
            {!isLoading ? <h2>{appointments?.length}</h2> : <Skeleton />}
          </DataItem>
        </div>
        <div className="col-lg-3">
          <DataItem color={"#85C1E9"}>
            <h6>Upcoming appointment</h6>
            {isLoading && <Skeleton />}
            {!isLoading && appointments[0] ? (
              <h4 className="text-light">{appointments[0].title}</h4>
            ) : (
              !isLoading && (
                <span className="text-light">No upocming appointment</span>
              )
            )}
          </DataItem>
        </div>
        <div className="col-lg-3">
          <DataItem color={"#DC7633"}>
            {!isLoading ? (
              <>
                <h6>accounts reached</h6>
                <h2>48k</h2>
              </>
            ) : (
              <Skeleton />
            )}
          </DataItem>
        </div>
      </div>
      <hr className="w-100 mt-5" />
      <div className="w-100 mt-4 ms-4">
        <h5>List of appointments</h5>
        {!isLoading ? (
          <List
            appointments={appointments}
            fetchAppointments={fetchAppointments}
          />
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
