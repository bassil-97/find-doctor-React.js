import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../UI/Sidebar";
import DashboardTitle from "../UI/DashboardTitle";
import Home from "./Home/Home";
import Analytics from "./Analytics/Analytics";
import Profile from "./Profile/Profile";
import { useAuth } from "../../hooks/auth-hook";
import { useHttpClient } from "../../hooks/http-hook";

export default function Dashboard() {
  const { userId, user } = useAuth();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [doctorName, setDoctorName] = useState();

  const fetchPatients = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/doctors/patients-list/${userId}`
      );

      setDoctorAppointments(responseData["appointments"]);
    } catch (err) {}
  };

  const handleDoctorName = (name) => {
    setDoctorName(name);
  };

  useEffect(() => {
    if (!user) return;

    setDoctorName(user.name);
    fetchPatients();
  }, [userId]);

  return (
    <div>
      <Sidebar />
      <div className="home">
        <DashboardTitle name={doctorName} />
        <Routes>
          <Route
            index
            element={
              <Home
                appointments={doctorAppointments}
                fetchAppointments={fetchPatients}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                appointments={doctorAppointments}
                fetchAppointments={fetchPatients}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/profile"
            element={
              <Profile user={user} handleDoctorName={handleDoctorName} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
