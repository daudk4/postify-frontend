import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validate_signin_form } from "@/schema";
import { api } from "@/utils";
import { useNavigate } from "react-router";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    const response = await api.post("/signin", {
      email,
      password,
    });
    setSubmitting(false);
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-5 bg-zinc-800 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validate_signin_form}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="space-y-4" noValidate>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-zinc-300"
                >
                  Email Address
                </label>
                <div
                  className={`relative border ${
                    touched.email && errors.email
                      ? "border-red-400"
                      : "border-zinc-600"
                  } rounded-lg focus-within:border-blue-400 transition-colors`}
                >
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-zinc-500 text-xs" />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-xs mt-0.5"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-zinc-300"
                  >
                    Password
                  </label>
                  <span className="text-xs text-blue-400 hover:underline cursor-not-allowed">
                    Forgot password?
                  </span>
                </div>
                <div
                  className={`relative border ${
                    touched.password && errors.password
                      ? "border-red-400"
                      : "border-zinc-600"
                  } rounded-lg focus-within:border-blue-400 transition-colors`}
                >
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-zinc-500 text-xs" />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-7 py-2 pr-8 outline-none rounded-lg text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-zinc-500 hover:text-zinc-300 focus:outline-none"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } text-xs`}
                      />
                    </button>
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-xs mt-0.5"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all duration-150 flex items-center justify-center text-sm mt-6"
              >
                <div className="flex items-center">
                  {isSubmitting ? "Processing..." : "Sign in"}
                  {!isSubmitting && (
                    <i className="fas fa-arrow-right mt-[1px] ml-2 text-xs" />
                  )}
                </div>
              </button>
            </Form>
          )}
        </Formik>

        {/* Social Sign-ins */}
        <div className="mt-6 pt-4 border-t border-zinc-700">
          <div className="flex items-center justify-center space-x-4">
            <button
              disabled
              className="flex items-center justify-center px-4 py-2 border border-zinc-600 rounded-lg hover:bg-zinc-700 transition-colors text-sm w-full cursor-not-allowed"
            >
              <i className="fab fa-google mr-2 text-zinc-300" />
              Sign in with Google
            </button>
            <button
              disabled
              className="flex items-center justify-center px-4 py-2 border border-zinc-600 rounded-lg hover:bg-zinc-700 transition-colors text-sm w-full cursor-not-allowed"
            >
              <i className="fab fa-github mr-2 text-zinc-300" />
              Sign in with GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-zinc-400">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
