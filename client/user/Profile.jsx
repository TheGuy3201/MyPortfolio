import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteUser from "./DeleteUser";
import auth from "../lib/auth-helper.js";
import { read } from "./api-user.js";
import { useLocation, Navigate, Link, useParams } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    if (!jwt || !jwt.token) {
      setRedirectToSignin(true);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const data = await read({ userId }, { t: jwt.token }, signal);
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error('Profile fetch error:', err);
          setRedirectToSignin(true);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [userId, jwt]);

  if (redirectToSignin) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary" }}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              user.created
                ? `Joined: ${new Date(user.created).toDateString()}`
                : "Loading..."
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
