import React, { useState, useEffect, memo } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Typography,
  Link,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { list } from "./api-user.js";
import { Link as RouterLink } from "react-router-dom";

const UserItem = memo(({ item }) => (
  <Link
    component={RouterLink}
    to={`/user/${item._id}`}
    underline="none"
    sx={{ color: "inherit" }}
  >
    <ListItem button>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={item.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <ArrowForward />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </Link>
));

UserItem.displayName = 'UserItem';

const Users = memo(() => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return () => abortController.abort();
  }, []);

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
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        All Users
      </Typography>
      <List dense>
        {users.map((item) => (
          <UserItem key={item._id} item={item} />
        ))}
      </List>
    </Paper>
  );
});

Users.displayName = 'Users';
export default Users;
