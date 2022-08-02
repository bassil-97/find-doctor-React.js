import React, { useContext, useState, useEffect } from "react";
import "./CreateAppointment.css";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Modal from "../UI/Modal";

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../shared/util/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

export default function CreateAppointment() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctors, setDoctors] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/doctors/",
          "GET"
        );

        setDoctors(responseData["doctors"]);
      } catch (err) {}
    };
    fetchDoctors();
  }, []);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
      fullName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      doctorId: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const createAppointmentHandler = async (event) => {
    setIsBooked(false);
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/create-appointment",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
          fullName: formState.inputs.fullName.value,
          email: formState.inputs.email.value,
          doctorId: formState.inputs.doctorId.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData["booked"]) {
        setIsBooked(true);
      }
    } catch (err) {}
  };

  return (
    <div className="appointment-container container-fluid">
      {isLoading && <LoadingSpinner asOverlay />}
      {error && <Modal open={!!error} error={error} />}
      <div className="create-appointment-title">
        <h4>Create New Appointement</h4>
      </div>
      <div className="container">
        {isBooked && (
          <div class="alert alert-success" role="alert">
            Appointement was booked successfully!
          </div>
        )}
        <form className="w-100" onSubmit={createAppointmentHandler}>
          <div className="row">
            <div className="col-lg-12">
              <Input
                element="input"
                id="title"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a title."
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <Input
                element="input"
                id="date"
                type="date"
                label="Date"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select a date."
                onInput={inputHandler}
              />
            </div>
            <div className="col-lg-5">
              <Input
                element="input"
                id="time"
                type="time"
                label="Time"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select a time."
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Input
                element="input"
                id="fullName"
                type="text"
                label="Full Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your full name."
                onInput={inputHandler}
              />
            </div>
            <div className="col-lg-6">
              <Input
                element="input"
                id="email"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter your email."
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Input
                id="doctorId"
                class="form-select"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              >
                {loadedDoctors &&
                  loadedDoctors.map((doctor) => {
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    );
                  })}
              </Input>
            </div>
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            create appointment
          </Button>
        </form>
      </div>
    </div>
  );
}
