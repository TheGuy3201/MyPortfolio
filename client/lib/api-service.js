export const createService = async (service, token) => {
  try {
    const response = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(service)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error creating service:', err);
    throw new Error(err.message || "Failed to create service");
  }
};

export const listServices = async () => {
  try {
    const response = await fetch("/api/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error fetching services:', err);
    throw new Error(err.message || "Failed to fetch services");
  }
};

export const listAllServices = async (token) => {
  try {
    const response = await fetch("/api/services/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error fetching all services:', err);
    throw new Error(err.message || "Failed to fetch all services");
  }
};

export const updateService = async (serviceId, service, token) => {
  try {
    const response = await fetch(`/api/services/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(service)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error updating service:', err);
    throw new Error(err.message || "Failed to update service");
  }
};

export const deleteService = async (serviceId, token) => {
  try {
    const response = await fetch(`/api/services/${serviceId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error deleting service:', err);
    throw new Error(err.message || "Failed to delete service");
  }
};

export const readService = async (serviceId) => {
  try {
    const response = await fetch(`/api/services/${serviceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error reading service:', err);
    throw new Error(err.message || "Failed to read service");
  }
};
