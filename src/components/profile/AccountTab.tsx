import React from 'react';
import {
  Grid,
  TextField
} from '@mui/material';

interface AccountTabProps {
  userForm: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    bio: string;
  };
  editMode: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountTab = ({ 
  userForm, 
  editMode, 
  handleInputChange 
}: AccountTabProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          name="firstName"
          value={userForm.firstName}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
          placeholder="Enter your first name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={userForm.lastName}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
          placeholder="Enter your last name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Username"
          name="username"
          value={userForm.username}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleInputChange}
          fullWidth
          disabled={!editMode}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Bio"
          name="bio"
          value={userForm.bio}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          disabled={!editMode}
          placeholder="Tell us about yourself"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default AccountTab; 