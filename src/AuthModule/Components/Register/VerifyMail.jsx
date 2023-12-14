import React, { useState } from "react";
import logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function VerifyMail() {
  let { baseUrl } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset(); //to Reset-form
    console.log(data);
    setIsLoading(true);
    axios
      .put(`${baseUrl}/api/v1/Users/verify`, data)
      .then((response) => {
        console.log(response);
        toast.success(response?.data?.message || "Account verified successfully");
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      });
    };
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Email</title>
      </Helmet>
      <div className="Auth-container  container-fluid">
        <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
          <div className="col-md-6">
            <div className="bg-white rounded-4 p-2">
              <div className="logo-cont text-center">
                <img src={logo} className="w-25" alt="logo" />
              </div>
              <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
                <h2>Verify User Email</h2>
                <p className="text-muted">
                  Please Enter Your Email And Verification code.
                </p>
                <div className="form-group my-3 position-relative ">
                  <i className="fa-regular fa-envelope  position-absolute"></i>
                  <input
                    className="form-control bgMain ps-4"
                    type="email"
                    placeholder="Enter your E-mail"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="text-danger">email is required</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className="text-danger">invalid email</span>
                  )}
                </div>
                <div className="form-group my-3 position-relative ">
                  <i className="fa-regular fa-envelope  position-absolute"></i>
                  <input
                    className="form-control bgMain ps-4"
                    type="text"
                    placeholder="Verification Code"
                    {...register("code", {
                      required: true,
                    })}
                  />
                  {errors.code && errors.code.type === "required" && (
                    <span className="text-danger">code is required</span>
                  )}
                </div>
                <div className="form-group my-3">
                  <button
                    type="submit"
                    className={
                      "btn btn-success w-100" + (isLoading ? " disabled" : " ")
                    }
                  >
                    {isLoading == true ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}
