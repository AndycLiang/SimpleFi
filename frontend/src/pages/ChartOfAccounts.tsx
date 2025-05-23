import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Dialog, DialogContent } from '@mui/material';
import api from '../api'; // Assuming you have an api.ts file for backend calls
import AccountForm from '../components/AccountForm'; // Import the AccountForm component

interface Account {
  id: number;
  account_code: string;
  account_name: string;
  account_type: string;
  parent_account_id?: number;
}

const ChartOfAccounts: React.FC = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
  const [parentAccounts, setParentAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);
 
  const fetchAccounts = async () => {
    try {
      const response = await api.getAccounts();
      setAccounts(response.data); // Assuming the response is an array of accounts directly
      setParentAccounts(response.data.filter((acc: Account) => acc.account_type === 'Asset' || acc.account_type === 'Liability' || acc.account_type === 'Equity' || acc.account_type === 'Revenue' || acc.account_type === 'Expense')); // Assuming these types can be parents
    } catch (error) {
      console.error('Error fetching accounts:', error); // Log the error from the actual response
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchAccounts(); // Refresh the list after closing the dialog (assuming an account might have been added)
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Chart of Accounts
      </Typography>

      <Button variant="contained" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        Add Account
      </Button>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="chart of accounts table">
            <TableHead>
              <TableRow>
                <TableCell>Account Code</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Parent Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.account_code}</TableCell>
                  <TableCell>{account.account_name}</TableCell>
                  <TableCell>{account.account_type}</TableCell>
                  <TableCell>{account.parent_account_id ? accounts.find(acc => acc.id === account.parent_account_id)?.account_name : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {/* Pass parent accounts and a callback to the form */}
            <AccountForm parentAccounts={accounts} onAccountAdded={handleCloseDialog} />
          </DialogContent>
      </Dialog>
      </Box>
    </>
  );
};

export default ChartOfAccounts;