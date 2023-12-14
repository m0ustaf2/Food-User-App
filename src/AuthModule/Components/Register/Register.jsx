import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Register() {
  let { baseUrl } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    axios
      .post(`${baseUrl}/api/v1/Users/Register`, data)
      .then((response) => {
        console.log(response);
        reset(); //to Reset-form
        toast.success(response?.data?.message || "Account created successfully. A verification code has been sent to your email address");
        navigate("/verify");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message||"Axios Error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (showPass) {
      setPassType("text");
      return;
    }
    setPassType("password");
  }, [showPass]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="Auth-container  container-fluid">
        <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
          <div className="col-md-6">
            <div className="bg-white rounded-4 p-2">
              <div className="logo-cont text-center">
                <img src={logo} className="w-25" alt="logo" />
              </div>
              <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
                <h2>Register</h2>
                <p className="text-muted">
                  Welcome Back! Please enter your details.
                </p>
                <div className="row my-2">
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-user position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type="text"
                        placeholder="UserName"
                        {...register("userName", {
                          required: true,
                          pattern: /^[a-zA-Z]+[0-9]{1,8}$/,
                        })}
                      />
                      {errors.userName &&
                        errors.userName.type === "required" && (
                          <span className="text-danger">
                            userName is required!!
                          </span>
                        )}
                      {errors.userName &&
                        errors.userName.type === "pattern" && (
                          <span className="text-danger">
                            The userName must contain characters and end with
                            numbers without spaces and shouldl't be greater than
                            eight characters.
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-envelope position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type="email"
                        placeholder="E-mail"
                        {...register("email", {
                          required: true,
                          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        })}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span className="text-danger">email is required!!</span>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <span className="text-danger">invalid email!!</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-earth-africa position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type="text"
                        placeholder="Country"
                        {...register("country", {
                          required: true,
                        })}
                      />
                      {errors.country && errors.country.type === "required" && (
                        <span className="text-danger">
                          country is required!!
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-mobile-screen-button position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type="tel"
                        placeholder="PhoneNumber"
                        {...register("phoneNumber", {
                          required: true,
                          pattern: /^01[0125][0-9]{8}$/,
                        })}
                      />
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "required" && (
                          <span className="text-danger">
                            phoneNumber is required!!
                          </span>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "pattern" && (
                          <span className="text-danger">
                            invalid phoneNumber!!
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-lock position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type={passType}
                        placeholder="Password"
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                        })}
                      />
                      {errors.password &&
                        errors.password.type === "required" && (
                          <span className="text-danger">
                            password is required!!
                          </span>
                        )}
                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <span className="text-danger">
                            The password must include at least one lowercase
                            letter, one uppercase letter, one digit, one special
                            character, and be at least 6 characters long!!
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group my-3 position-relative">
                      <i className="fa-solid fa-lock position-absolute"></i>
                      <input
                        className="form-control bgMain ps-4"
                        type={passType}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: true,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                          validate: {
                            checkNewPassConfirmationHandler: (value) => {
                              const { password } = getValues();
                              return (
                                password === value ||
                                "Password and ConfirmPassword doesn't match!!"
                              );
                            },
                          },
                        })}
                      />
                      {errors.confirmPassword && (
                        <span className="text-danger">
                          {errors.confirmPassword?.message}
                        </span>
                      )}
                      {errors.confirmPassword &&
                        errors.confirmPassword.type === "required" && (
                          <span className="text-danger">
                            confirmPassword is required!!
                          </span>
                        )}
                      {errors.confirmPassword &&
                        errors.confirmPassword.type === "pattern" && (
                          <span className="text-danger">
                            The password must include at least one lowercase
                            letter, one uppercase letter, one digit, one special
                            character, and be at least 6 characters long!!
                          </span>
                        )}
                    </div>
                  </div>
                </div>

                <div className="form-group my-2">
                  <input
                    className="mx-1"
                    type="checkbox"
                    name="passType"
                    checked={showPass}
                    onChange={(e) => {
                      console.log(showPass);
                      setShowPass((prev) => !prev);
                    }}
                  />
                  <label htmlFor="passType">
                    {showPass ? "hide password" : "show password "}
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                
                <Link
                  className="text-decoration-none text-success"
                  to={"/login"}
                >
                  Login Now?
                </Link>
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
                      "Register"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
