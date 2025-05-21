import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Stack,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// Sample data - in a real app, this would come from your API
const sampleTransactions = [
  {
    id: 1,
    date: '2024-02-01',
    description: 'Client Payment',
    amount: 5000.00,
    type: 'credit',
    reconciled: false,
  },
  {
    id: 2,
    date: '2024-02-02',
    description: 'Office Supplies',
    amount: -250.00,
    type: 'debit',
    reconciled: false,
  },
  {
    id: 3,
    date: '2024-02-03',
    description: 'Consulting Revenue',
    amount: 3000.00,
    type: 'credit',
    reconciled: false,
  },
];

const BankReconciliation = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [statementBalance, setStatementBalance] = useState('');
  const [transactions, setTransactions] = useState(sampleTransactions);

  const handleReconcile = (transactionId: number) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, reconciled: !t.reconciled } : t
    ));
  };

  const calculateBookBalance = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateReconciledBalance = () => {
    return transactions
      .filter(t => t.reconciled)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getDifference = () => {
    const statement = parseFloat(statementBalance) || 0;
    const reconciled = calculateReconciledBalance();
    return statement - reconciled;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bank Reconciliation
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                select
                label="Bank Account"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                fullWidth
              >
                <MenuItem value="account1">Main Checking Account</MenuItem>
                <MenuItem value="account2">Savings Account</MenuItem>
                <MenuItem value="account3">Business Account</MenuItem>
              </TextField>

              <TextField
                label="Statement Balance"
                type="number"
                value={statementBalance}
                onChange={(e) => setStatementBalance(e.target.value)}
                fullWidth
              />

              <Box>
                <Typography variant="subtitle2">Book Balance:</Typography>
                <Typography variant="h6">${calculateBookBalance().toFixed(2)}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2">Reconciled Balance:</Typography>
                <Typography variant="h6">${calculateReconciledBalance().toFixed(2)}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2">Difference:</Typography>
                <Typography variant="h6" color={getDifference() === 0 ? 'success.main' : 'error.main'}>
                  ${getDifference().toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">Reconciled</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={transaction.reconciled}
                        onChange={() => handleReconcile(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell align="right">
                      <Typography
                        color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                      >
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BankReconciliation; 