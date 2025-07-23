import { useState, useEffect, memo, useCallback } from "react";
import { listServices } from "../lib/api-service.js";

const Services = memo(() => {
  const [services, setServices] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await listServices();
        setServices(data);
        setFlipped(Array(data.length).fill(false));
      } catch (err) {
        setError(err.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to toggle the flipped state of a service card
  const toggleFlip = useCallback((index) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  }, []);

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Services page */}
      <h1>Services</h1>

      {/* Services Panel */}
      <div className="ServicesPanel">
        {services.map((service, index) => (
          <div
            className={`ServiceCard ${flipped[index] ? "flipped" : ""}`}
            key={index}
          >
            {/* Front of service card*/}
            <div className="ServiceCardInner">
              <div
                className="ServiceCardFront"
                onClick={() => toggleFlip(index)}
              >
                <img src={service.icon} alt={`${service.title} service icon - click to learn more about this service offering`} className="service-icon" />
                <h2>{service.title}</h2>
              </div>
              
              {/* Back of service card */}
              <div 
                className="ServiceCardBack"
                onClick={() => toggleFlip(index)}
              >
                <h2>{service.title}</h2>
                <div className="ServiceCardContent">
                  <p>{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

Services.displayName = 'Services';
export default Services;
