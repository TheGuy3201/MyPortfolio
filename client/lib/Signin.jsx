import React, { useState } from "react";
import auth from "./auth-helper.js";
import { Navigate, useLocation } from "react-router-dom";
import { signin } from "./api-auth.js";

export default function Signin() {
  const location = useLocation();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    console.log("Submitting:", user);
    try {
      const data = await signin(user);
      console.log("API response:", data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else if (!data.token || !data.user) {
        setValues({ ...values, error: "Invalid response from server" });
      } else {
        // Log the role for debugging
        console.log("User role:", data.user.role);
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    } catch (err) {
      console.error("Signin error:", err);
      setValues({ ...values, error: "Failed to sign in" });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || {
    from: { pathname: "/" },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <div className="signin-panel">
      <h2>Sign In</h2>
      <form onSubmit={clickSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange("email")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange("password")}
          required
        />
        {values.error && (
          <div className="signin-error">{values.error}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
