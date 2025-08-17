import React, { useState, useEffect } from "react";
import { list, remove } from "./api-education";
import { Link, useNavigate } from "react-router-dom";
import auth from "../lib/auth-helper";

export default function EducationList() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!jwt || !jwt.user || jwt.user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchEducations = async () => {
      try {
        const data = await list();
        if (data?.error) {
          setError(data.error);
        } else {
          setEducations(data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load educations');
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, [jwt, navigate]);

  const handleDelete = async (educationId) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      const result = await remove({ educationId }, { t: jwt.token });
      if (result.error) {
        setError(result.error);
      } else {
        setEducations(educations.filter(edu => edu._id !== educationId));
      }
    }
  };

  const isAdmin = jwt && jwt.user && jwt.user.role === 'admin';

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="education-list">
      <h2>Education & Qualifications</h2>
      
      {isAdmin && (
        <Link to="/education/new" className="add-button">
          Add New Education
        </Link>
      )}
      
      {educations.length === 0 ? (
        <p>No education records found.</p>
      ) : (
        <div className="education-grid">
          {educations.map((education) => (
            <div key={education._id} className="education-card">
              <h3>{education.degree}</h3>
              <h4>{education.institution}</h4>
              <p><strong>Field:</strong> {education.fieldOfStudy}</p>
              <p><strong>Period:</strong> {new Date(education.startDate).getFullYear()} - {education.endDate ? new Date(education.endDate).getFullYear() : 'Present'}</p>
              {education.description && <p>{education.description}</p>}
              
              {isAdmin && (
                <div className="admin-actions">
                  <Link to={`/education/edit/${education._id}`} className="edit-button">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(education._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
