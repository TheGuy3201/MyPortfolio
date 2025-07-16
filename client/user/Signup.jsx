import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "./api-user";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _handleClose = () => setOpen(false);

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    
    create(user).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else setOpen(true);
    });
  };

  return (
    <div className="signup-panel">
      <h2>Sign Up</h2>
      <form onSubmit={clickSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange("name")}
          required
        />
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
          <div className="signup-error">{values.error}</div>
        )}
        <button type="submit">Submit</button>
      </form>
      {open && (
        <div style={{ marginTop: "2rem", color: "var(--accent-green)" }}>
          New account successfully created.<br />
          <Link to="/signin" style={{ color: "var(--accent-cyan)" }}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
