import React, { useState, useEffect } from "react";
import { listAll, remove } from "../lib/api-service";
import { Link } from "react-router-dom";
import auth from "../lib/auth-helper";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listAll(jwt.token).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setServices(data);
      }
      setLoading(false);
    });

    return () => abortController.abort();
  }, []);

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const result = await remove(serviceId, jwt.token);
      if (result.error) {
        setError(result.error);
      } else {
        setServices(services.filter(service => service._id !== serviceId));
      }
    }
  };

  const isAdmin = jwt && jwt.user && jwt.user.role === 'admin';

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="service-list-panel">
      <h2>Manage Services</h2>
      
      {isAdmin && (
        <div className="admin-actions">
          <Link to="/admin/services/new" className="admin-link">
            Add New Service
          </Link>
        </div>
      )}

      <div className="service-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>
            <p className="service-short-desc">{service.shortDescription}</p>
            <p className="service-category">Category: {service.category}</p>
            {service.price && <p className="service-price">Price: {service.price}</p>}
            {service.duration && <p className="service-duration">Duration: {service.duration}</p>}
            <p className="service-status">
              Status: {service.isActive ? 
                <span style={{ color: 'green' }}>Active</span> : 
                <span style={{ color: 'red' }}>Inactive</span>
              }
            </p>
            <p className="service-description">{service.description}</p>
            
            {isAdmin && (
              <div className="service-actions">
                <Link 
                  to={`/admin/services/edit/${service._id}`} 
                  className="edit-link"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(service._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="no-services">
          <p>No services available.</p>
          {isAdmin && (
            <Link to="/admin/services/new">Add the first service</Link>
          )}
        </div>
      )}
    </div>
  );
}
