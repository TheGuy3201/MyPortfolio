import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Box
} from "@mui/material";
import {
  School as SchoolIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Build as BuildIcon
} from "@mui/icons-material";
import auth from "../lib/auth-helper";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  // Check if user is admin
  if (!jwt || jwt.user.role !== 'admin') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" color="error" align="center">
          Access Denied
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          You must be an admin to access this page.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  const adminCards = [
    {
      title: "Manage Education",
      description: "View, edit, and delete education entries",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      link: "/admin/education",
      color: "#1976d2"
    },
    {
      title: "Add Education",
      description: "Create new education entries",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      link: "/admin/education/new",
      color: "#2e7d32"
    },
    {
      title: "Add Project",
      description: "Create new project entries",
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      link: "/admin/projects/new",
      color: "#ed6c02"
    },
    {
      title: "View Contacts",
      description: "View and manage contact form submissions",
      icon: <ContactIcon sx={{ fontSize: 40 }} />,
      link: "/admin/contacts",
      color: "#9c27b0"
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      link: "/users",
      color: "#d32f2f"
    },
    {
      title: "Manage Services",
      description: "Add and edit service offerings",
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      link: "/admin/services",
      color: "#795548"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <DashboardIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {jwt.user.name}! Manage your portfolio content below.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {adminCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: card.color, mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  component={Link}
                  to={card.link}
                  variant="contained"
                  sx={{ backgroundColor: card.color }}
                >
                  Open
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ minWidth: 120 }}
          >
            View Portfolio
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/user/${jwt.user._id}`)}
            sx={{ minWidth: 120 }}
          >
            My Profile
          </Button>
          <Button
            variant="outlined"
            onClick={() => auth.clearJWT(() => navigate('/'))}
            color="error"
            sx={{ minWidth: 120 }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
