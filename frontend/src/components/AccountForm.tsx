import React, { useState } from 'react';
import {
  TextField,
  Button,
  SelectChangeEvent,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { AccountTypeEnum } from '../api'; 
import api from '../api'; // Moved to the top

interface AccountFormProps {
  parentAccounts: ParentAccount[];
  onAccountAdded: () => void; // Callback when an account is successfully added
}

interface Account {
  id: number;
  account_code: string;
  account_name: string;
  account_type: string;
}

interface ParentAccount {
  id: number;
  account_name: string;
}

const AccountForm: React.FC<AccountFormProps> = ({ parentAccounts, onAccountAdded }) => {
  const [formData, setFormData] = useState({
    account_code: '',
    account_name: '',
    account_type: '',
    description: '',
    parent_account_id: '' as string | number | null,
  });

  const [errors, setErrors] = useState({
    account_code: '',
    account_name: '',
    account_type: '',
  });

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number | null>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value === '' ? null : value, // Set to null if value is empty string
    });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { account_code: '', account_name: '', account_type: '' };


    if (!formData.account_code.trim()) {
      newErrors.account_code = 'Account code is required';
      valid = false;
    }

    if (!formData.account_name.trim()) {
      newErrors.account_name = 'Account name is required';
      valid = false;
    }

    if (!formData.account_type) {
      newErrors.account_type = 'Account type is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await api.createAccount(formData);
        onAccountAdded(); // Callback
        setFormData({
          account_code: '',
          account_name: '',
          account_type: '',
          description: '',
          parent_account_id: '',
        });
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
      <Typography variant="h6" gutterBottom>
        Create New Account
      </Typography>

      <TextField
        label="Account Code"
        name="account_code"
        value={formData.account_code}
        onChange={handleInputChange}
        error={!!errors.account_code}
        helperText={errors.account_code}
        fullWidth
        required
      />

      <TextField
        label="Account Name"
        name="account_name"
        value={formData.account_name}
        onChange={handleInputChange}
        error={!!errors.account_name}
        helperText={errors.account_name}
        fullWidth
        required
      />

      <FormControl fullWidth required error={!!errors.account_type}>
        <InputLabel id="account-type-label">Account Type</InputLabel>
        <Select
          labelId="account-type-label"
          id="account-type"
          name="account_type"
          value={formData.account_type}
          label="Account Type"
          onChange={handleSelectChange}
        >
          {Object.values(AccountTypeEnum).map((type) => (
            <MenuItem key={type as string} value={type as string}>
              {type as string}
            </MenuItem>
          ))}
        </Select>
        {errors.account_type && (
          <Typography variant="caption" color="error">
            {errors.account_type}
          </Typography>
        )}
      </FormControl>

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="parent-account-label">Parent Account (Optional)</InputLabel>
        <Select
          labelId="parent-account-label"
          id="parent-account"
          name="parent_account_id"
          value={formData.parent_account_id}
          label="Parent Account (Optional)"
          onChange={handleSelectChange}
        >
          <MenuItem value="">None</MenuItem>
          {parentAccounts.map((account: ParentAccount) => (
            <MenuItem key={account.id} value={account.id as number}>
              {account.account_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Create Account
      </Button>
    </Box>
  );
};

export default AccountForm;