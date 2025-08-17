import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Divider, Alert } from '@mui/material';
import { Delete as DeleteIcon, Email as EmailIcon, Phone as PhoneIcon, Person as PersonIcon, Subject as SubjectIcon } from '@mui/icons-material';
import { listContacts, deleteContact } from './api-contact';
import auth from '../lib/auth-helper';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const jwt = auth.isAuthenticated();
        const data = await listContacts(jwt.token);
        setContacts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      const jwt = auth.isAuthenticated();
      await deleteContact(contactId, jwt.token);
      setContacts(contacts.filter(contact => contact._id !== contactId));
      setSuccess('Contact deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete contact');
    }
  };

  if (loading) return <Typography>Loading contacts...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Contacts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {contacts.length === 0 ? (
        <Typography>No contacts found</Typography>
      ) : (
        <List>
          {contacts.map((contact) => (
            <Paper key={contact._id} sx={{ mb: 2 }}>
              <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {contact.fullName}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">{contact.email}</Typography>
                </Box>
                
                {contact.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">{contact.phone}</Typography>
                  </Box>
                )}
                
                {contact.subject && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SubjectIcon sx={{ mr: 1 }} />
                    <Typography variant="body2"><strong>Subject:</strong> {contact.subject}</Typography>
                  </Box>
                )}
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Message:</strong> {contact.message}
                </Typography>
                
                <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
                  Submitted: {new Date(contact.created).toLocaleDateString()}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(contact._id)}
                    size="small"
                  >
                    Delete
                  </Button>
                </Box>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ContactList;
