import React from 'react';
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
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Sample data - in a real app, this would come from your API
const samplePayables = [
  {
    id: 1,
    vendor: 'Office Supplies Co.',
    invoiceNumber: 'INV-001',
    amount: 1500.00,
    dueDate: '2024-02-15',
    status: 'Pending',
  },
  {
    id: 2,
    vendor: 'IT Services Ltd.',
    invoiceNumber: 'INV-002',
    amount: 3200.00,
    dueDate: '2024-02-20',
    status: 'Overdue',
  },
  {
    id: 3,
    vendor: 'Marketing Agency',
    invoiceNumber: 'INV-003',
    amount: 5000.00,
    dueDate: '2024-03-01',
    status: 'Paid',
  },
];

const AccountsPayable = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Accounts Payable</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // Handle new payable creation
            console.log('Add new payable clicked');
          }}
        >
          New Payable
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samplePayables.map((payable) => (
              <TableRow key={payable.id}>
                <TableCell>{payable.vendor}</TableCell>
                <TableCell>{payable.invoiceNumber}</TableCell>
                <TableCell align="right">${payable.amount.toFixed(2)}</TableCell>
                <TableCell>{payable.dueDate}</TableCell>
                <TableCell>{payable.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => {
                      // Handle view/edit action
                      console.log('View/Edit clicked for', payable.id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      // Handle pay action
                      console.log('Pay clicked for', payable.id);
                    }}
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccountsPayable; 