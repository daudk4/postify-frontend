import { useState } from "react";
import { api, snackbar } from "@/utils";
import { useNavigate } from "react-router";
import { validate_signup_form } from "@/schema";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const initialValues = {
    username: "",
    name: "",
    age: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { username, name, email, age, password } = values;
      const { status, message } = await api.post("/signup", {
        username,
        name,
        email,
        age,
        password,
      });
      setSubmitting(false);
      if (status === 200) snackbar(message, "success", "top-center");

      navigate("/verify-account", { state: { email } });
    } catch (error) {
      const statusCode = error.status;
      const errorMessage = error.message;
      snackbar(`Error ${statusCode}: ${errorMessage}`, "error");
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-5 bg-zinc-800 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validate_signup_form}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-3">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="text-xs font-medium text-zinc-300"
                >
                  Username
                </label>
                <div
                  className={`relative border rounded-lg transition-colors ${
                    touched.username && errors.username
                      ? "border-red-400"
                      : "border-zinc-600"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <i className="fas fa-user text-zinc-500 text-xs"></i>
                  </div>
                  <Field
                    id="username"
                    name="username"
                    className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                    type="text"
                    placeholder="Choose a username"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-400 text-xs mt-0.5"
                />
              </div>

              {/* Name & Age */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-zinc-300"
                  >
                    Full Name
                  </label>
                  <div
                    className={`relative border rounded-lg transition-colors ${
                      touched.name && errors.name
                        ? "border-red-400"
                        : "border-zinc-600"
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <i className="fas fa-id-card text-zinc-500 text-xs"></i>
                    </div>
                    <Field
                      id="name"
                      name="name"
                      className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                      type="text"
                      placeholder="Your name"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-400 text-xs mt-0.5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="text-xs font-medium text-zinc-300"
                  >
                    Age
                  </label>
                  <div
                    className={`relative border rounded-lg transition-colors ${
                      touched.age && errors.age
                        ? "border-red-400"
                        : "border-zinc-600"
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <i className="fas fa-calendar text-zinc-500 text-xs"></i>
                    </div>
                    <Field
                      id="age"
                      name="age"
                      className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                      type="number"
                      min="18"
                      max="120"
                      placeholder="Age"
                    />
                  </div>
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-red-400 text-xs mt-0.5"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-zinc-300"
                >
                  Email Address
                </label>
                <div
                  className={`relative border rounded-lg transition-colors ${
                    touched.email && errors.email
                      ? "border-red-400"
                      : "border-zinc-600"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-zinc-500 text-xs"></i>
                  </div>
                  <Field
                    id="email"
                    name="email"
                    className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-xs mt-0.5"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-zinc-300"
                >
                  Password
                </label>
                <div
                  className={`relative border rounded-lg transition-colors ${
                    touched.password && errors.password
                      ? "border-red-400"
                      : "border-zinc-600"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-zinc-500 text-xs"></i>
                  </div>
                  <Field
                    id="password"
                    name="password"
                    className="w-full bg-transparent px-7 py-2 pr-8 outline-none rounded-lg text-sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-zinc-500 hover:text-zinc-300 focus:outline-none cursor-pointer"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        } text-xs`}
                      ></i>
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
                className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all duration-150 flex items-center justify-center text-sm cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
                {!isSubmitting && (
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-3 text-center text-xs text-zinc-400">
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
