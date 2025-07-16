import React, { useState, useEffect } from "react";
import { read, update } from "../lib/api-education";
import { useParams, useNavigate } from "react-router-dom";
import auth from "../lib/auth-helper";

export default function EditEducation() {
  const [values, setValues] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
    error: "",
  });
  const [loading, setLoading] = useState(true);
  const { educationId } = useParams();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ educationId }, signal).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          institution: data.institution || "",
          degree: data.degree || "",
          fieldOfStudy: data.fieldOfStudy || "",
          startDate: data.startDate ? data.startDate.split('T')[0] : "",
          endDate: data.endDate ? data.endDate.split('T')[0] : "",
          description: data.description || "",
          error: "",
        });
      }
      setLoading(false);
    });

    return () => abortController.abort();
  }, [educationId]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    
    if (!jwt || jwt.user.role !== 'admin') {
      setValues({ ...values, error: "Admin access required" });
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
    
    update({ educationId }, { t: jwt.token }, education).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate("/education");
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="education-form-panel">
      <h2>Edit Education</h2>
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
        <button type="submit">Update Education</button>
      </form>
    </div>
  );
}
