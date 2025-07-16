const API_BASE = "/api/educations";

const handleResponse = async (response) => {
  try {
    // Check if the response is ok
    if (!response.ok) {
      return { error: `HTTP error! status: ${response.status}` };
    }
    
    // Try to get the response text first
    const text = await response.text();
    
    // If empty response, return appropriate message
    if (!text) {
      return { error: "No response from server" };
    }
    
    // Try to parse JSON
    try {
      return JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse JSON:", parseErr);
      return { error: "Invalid JSON response from server" };
    }
  } catch (err) {
    console.error("Failed to handle response:", err);
    return { error: "Network error occurred" };
  }
};

const handleError = (err) => {
  console.error("API call failed:", err);
  return { error: err.message || "An unexpected error occurred" };
};

const create = async (education, credentials) => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(education),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const list = async (signal) => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
      signal,
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const read = async ({ educationId }, signal) => {
  try {
    const response = await fetch(`${API_BASE}/${educationId}`, {
      method: "GET",
      signal,
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const update = async ({ educationId }, credentials, education) => {
  try {
    const response = await fetch(`${API_BASE}/${educationId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(education),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const remove = async ({ educationId }, credentials) => {
  try {
    const response = await fetch(`${API_BASE}/${educationId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export { create, list, read, update, remove };
