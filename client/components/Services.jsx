import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { listServices } from "../lib/api-service.js";

const ServiceCard = memo(({ service, index, isFlipped, onToggleFlip }) => (
    <div
        className={`ServiceCard ${isFlipped ? "flipped" : ""}`}
        key={index}
    >
        {/* Front of service card*/}
        <div className="ServiceCardInner">
            <div
                className="ServiceCardFront"
                onClick={() => onToggleFlip(index)}
            >
                <img src={service.icon} alt={service.title} className="service-icon" loading="lazy" />
                <h2>{service.title}</h2>
            </div>
            
            {/* Back of service card */}
            <div 
                className="ServiceCardBack"
                onClick={() => onToggleFlip(index)}
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
));

ServiceCard.displayName = 'ServiceCard';

const Services = memo(() => {
    const [services, setServices] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchServices = useCallback(async () => {
        try {
            const data = await listServices();
            setServices(data);
            setFlipped(Array(data.length).fill(false));
        } catch (err) {
            setError(err.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    // Function to toggle the flipped state of a service card
    const toggleFlip = useCallback((index) => {
        setFlipped((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    }, []);

    const memoizedServiceCards = useMemo(() => 
        services.map((service, index) => (
            <ServiceCard
                key={service._id || index}
                service={service}
                index={index}
                isFlipped={flipped[index]}
                onToggleFlip={toggleFlip}
            />
        )), [services, flipped, toggleFlip]);

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {/* Services page */}
            <h1>Services</h1>

            {/* Services Panel */}
            <div className="ServicesPanel">
                {memoizedServiceCards}
            </div>
        </>
    );
});

Services.displayName = 'Services';
export default Services;
