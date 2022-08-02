import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../UI/Modal";
import Skeleton from "../../UI/Skeleton";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function Profile({ user, handleDoctorName }) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctor, setLoadedDoctor] = useState();
  const doctorId = user?._id;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const fetchDoctor = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/doctors/${doctorId}`
      );
      setLoadedDoctor(responseData.doctor);
      setFormData(
        {
          title: {
            value: responseData.doctor.name,
            isValid: true,
          },
          description: {
            value: responseData.doctor.email,
            isValid: true,
          },
        },
        true
      );
      clearError();
    } catch (err) {}
  };

  useEffect(() => {
    fetchDoctor();
  }, [sendRequest, doctorId, setFormData]);

  const doctorUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/doctors/${doctorId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      handleDoctorName(responseData["doctor"].name);
      fetchDoctor();
    } catch (err) {}
  };

  return (
    <div className="profile">
      {error && <Modal open error={error} />}
      <div className="row mt-4 mb-5">
        <div className="col-lg-12 d-flex justify-content-center">
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 220,
              height: 220,
              fontSize: "6em",
            }}
          >
            {loadedDoctor?.name["0"].toUpperCase()}
          </Avatar>
        </div>
      </div>
      <div className="row mt-5">
        <h5 className="mb-3">Update your information</h5>
        {isLoading && <Skeleton width={100} />}
        {!isLoading && loadedDoctor && (
          <form
            className="update-doctor-form"
            onSubmit={doctorUpdateSubmitHandler}
          >
            <Input
              id="name"
              element="input"
              type="text"
              label="Full Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
              initialValue={loadedDoctor.name}
              initialValid={true}
            />
            <Input
              id="email"
              element="input"
              type="email"
              label="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email."
              onInput={inputHandler}
              initialValue={loadedDoctor.email}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE MY INFORMATION
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
