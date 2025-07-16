import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "../lib/api-service";
import auth from "../lib/auth-helper";

export default function ServiceForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: "",
    duration: "",
    category: "",
    isActive: true,
    error: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    const value = name === "isActive" ? event.target.checked : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const jwt = auth.isAuthenticated();
    
    if (!jwt || jwt.user.role !== 'admin') {
      setValues({ ...values, error: "Admin access required" });
      return;
    }

    const service = {
      name: values.name,
      description: values.description,
      shortDescription: values.shortDescription,
      price: values.price,
      duration: values.duration,
      category: values.category,
      isActive: values.isActive,
    };
    
    create(service, jwt.token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
        setValues({
          name: "",
          description: "",
          shortDescription: "",
          price: "",
          duration: "",
          category: "",
          isActive: true,
          error: "",
        });
      }
    });
  };

  return (
    <div className="service-form-panel">
      <h2>Add Service</h2>
      <form onSubmit={clickSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={values.name}
          onChange={handleChange("name")}
          required
        />
        <textarea
          placeholder="Short Description"
          value={values.shortDescription}
          onChange={handleChange("shortDescription")}
          rows="2"
          required
        />
        <textarea
          placeholder="Full Description"
          value={values.description}
          onChange={handleChange("description")}
          rows="4"
          required
        />
        <input
          type="text"
          placeholder="Price (e.g., $50/hour, $500/project)"
          value={values.price}
          onChange={handleChange("price")}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 1-2 weeks, 5 hours)"
          value={values.duration}
          onChange={handleChange("duration")}
        />
        <select
          value={values.category}
          onChange={handleChange("category")}
          required
        >
          <option value="">Select Category</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="design">Design</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={handleChange("isActive")}
          />
          Active Service
        </label>
        {values.error && (
          <div className="form-error">{values.error}</div>
        )}
        <button type="submit">Add Service</button>
      </form>
      {open && (
        <div style={{ marginTop: "2rem", color: "var(--accent-green)" }}>
          Service successfully added!<br />
          <Link to="/services" style={{ color: "var(--accent-cyan)" }}>
            View Services
          </Link>
        </div>
      )}
    </div>
  );
}
