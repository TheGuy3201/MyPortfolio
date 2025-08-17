import React, { useState } from "react";
import { Link } from "react-router-dom";
import { create } from "./api-project.js";
import auth from "../lib/auth-helper.js";

export default function ProjectForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
    startDate: "",
    endDate: "",
    image: "",
    error: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setValues({ ...values, image: event.target.files[0] });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const jwt = auth.isAuthenticated();
    
    if (!jwt) {
      setValues({ ...values, error: "Please sign in to add project" });
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("technologies", values.technologies);
    formData.append("githubLink", values.githubLink);
    formData.append("liveLink", values.liveLink);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    if (values.image) {
      formData.append("image", values.image);
    }
    
    create({ shopId: jwt.user._id }, { t: jwt.token }, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
        setValues({
          name: "",
          description: "",
          technologies: "",
          githubLink: "",
          liveLink: "",
          startDate: "",
          endDate: "",
          image: "",
          error: "",
        });
      }
    });
  };

  return (
    <div className="project-form-panel">
      <h2>Add Project</h2>
      <form onSubmit={clickSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={values.name}
          onChange={handleChange("name")}
          required
        />
        <textarea
          placeholder="Description"
          value={values.description}
          onChange={handleChange("description")}
          rows="4"
          required
        />
        <input
          type="text"
          placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
          value={values.technologies}
          onChange={handleChange("technologies")}
          required
        />
        <input
          type="url"
          placeholder="GitHub Link"
          value={values.githubLink}
          onChange={handleChange("githubLink")}
        />
        <input
          type="url"
          placeholder="Live Demo Link"
          value={values.liveLink}
          onChange={handleChange("liveLink")}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {values.error && (
          <div className="form-error">{values.error}</div>
        )}
        <button type="submit">Add Project</button>
      </form>
      {open && (
        <div style={{ marginTop: "2rem", color: "var(--accent-green)" }}>
          Project successfully added!<br />
          <Link to="/projects" style={{ color: "var(--accent-cyan)" }}>
            View Projects
          </Link>
        </div>
      )}
    </div>
  );
}
