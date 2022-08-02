import React, { useState, useContext } from "react";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Modal from "../UI/Modal";
import Switch from "../UI/Switch";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

export default function Form() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/doctors/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.doctorId,
          responseData.token,
          responseData.doctor
        );
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/doctors/signup",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.name.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.doctorId,
          responseData.token,
          responseData.doctor
        );
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <Modal open={!!error} error={error} />}
        <h4 className="text-light">
          Welcome back, please enter your information
        </h4>
        <hr className="bg-light" />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Full Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
              light
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
            light
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
            light
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <div className="w-100 d-flex justify-content-end">
          <Switch
            switchModeHandler={switchModeHandler}
            formState={!isLoginMode ? "login" : "signup"}
          />
          {/*<Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button> */}
        </div>
      </div>
    </React.Fragment>
  );
}
