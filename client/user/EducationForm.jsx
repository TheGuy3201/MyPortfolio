import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "../lib/api-education";
import auth from "../lib/auth-helper";

export default function EducationForm() {
  const [values, setValues] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
    error: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const jwt = auth.isAuthenticated();
    
    if (!jwt) {
      setValues({ ...values, error: "Please sign in to add education" });
      return;
    }

    const education = {
      institution: values.institution,
      degree: values.degree,
      fieldOfStudy: values.fieldOfStudy,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    };
    
    create(education, { t: jwt.token }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
        setValues({
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
          error: "",
        });
      }
    });
  };

  return (
    <div className="education-form-panel">
      <h2>Add Education</h2>
      <form onSubmit={clickSubmit}>
        <input
          type="text"
          placeholder="Institution"
          value={values.institution}
          onChange={handleChange("institution")}
          required
        />
        <input
          type="text"
          placeholder="Degree"
          value={values.degree}
          onChange={handleChange("degree")}
          required
        />
        <input
          type="text"
          placeholder="Field of Study"
          value={values.fieldOfStudy}
          onChange={handleChange("fieldOfStudy")}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={values.startDate}
          onChange={handleChange("startDate")}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={values.endDate}
          onChange={handleChange("endDate")}
        />
        <textarea
          placeholder="Description"
          value={values.description}
          onChange={handleChange("description")}
          rows="4"
        />
        {values.error && (
          <div className="form-error">{values.error}</div>
        )}
        <button type="submit">Add Education</button>
      </form>
      {open && (
        <div style={{ marginTop: "2rem", color: "var(--accent-green)" }}>
          Education successfully added!<br />
          <Link to="/education" style={{ color: "var(--accent-cyan)" }}>
            View Education
          </Link>
        </div>
      )}
    </div>
  );
}
