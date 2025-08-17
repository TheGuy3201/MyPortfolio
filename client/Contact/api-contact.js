export const createContact = async (contact) => {
  try {
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });
    return await response.json();
  } catch {
    return { error: "Network error" };
  }
};

export const listContacts = async (token) => {
  try {
    const response = await fetch("/api/contacts", {
      method: "GET",
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
    console.error('Error fetching contacts:', err);
    throw new Error(err.message || "Failed to fetch contacts");
  }
};

export const deleteContact = async (contactId, token) => {
  try {
    const response = await fetch(`/api/contacts/${contactId}`, {
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
    console.error('Error deleting contact:', err);
    throw new Error(err.message || "Failed to delete contact");
  }
};