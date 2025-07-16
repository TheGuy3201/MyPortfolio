import React, { useState, useEffect } from "react";
import { list, remove } from "../lib/api-contact";
import auth from "../lib/auth-helper";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const jwt = auth.isAuthenticated();

  // Create a proper list function for contacts
  const listContacts = async (signal) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "GET",
        signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`,
        },
      });
      
      if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
      }
      
      const text = await response.text();
      if (!text) {
        return { error: "No response from server" };
      }
      
      try {
        return JSON.parse(text);
      } catch (parseErr) {
        return { error: "Invalid JSON response from server" };
      }
    } catch (err) {
      return { error: err.message || "Network error occurred" };
    }
  };

  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`,
        },
      });
      
      if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
      }
      
      return { success: true };
    } catch (err) {
      return { error: err.message || "Network error occurred" };
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (!jwt || jwt.user.role !== 'admin') {
      setError("Admin access required");
      setLoading(false);
      return;
    }

    listContacts(signal).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setContacts(data);
      }
      setLoading(false);
    });

    return () => abortController.abort();
  }, []);

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const result = await deleteContact(contactId);
      if (result.error) {
        setError(result.error);
      } else {
        setContacts(contacts.filter(contact => contact._id !== contactId));
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="contact-list">
      <h2>Contact Messages</h2>
      
      {contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="contact-grid">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <h3>{contact.FullName}</h3>
              <p><strong>Email:</strong> {contact.Email}</p>
              {contact.Phone && <p><strong>Phone:</strong> {contact.Phone}</p>}
              {contact.Subject && <p><strong>Subject:</strong> {contact.Subject}</p>}
              <p><strong>Message:</strong> {contact.Message}</p>
              <p><strong>Received:</strong> {new Date(contact.created).toLocaleDateString()}</p>
              
              <div className="admin-actions">
                <button 
                  onClick={() => handleDelete(contact._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
