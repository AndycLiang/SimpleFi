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
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Sample data - in a real app, this would come from your API
const sampleReceivables = [
  {
    id: 1,
    customer: 'Tech Corp',
    invoiceNumber: 'INV-101',
    amount: 5000.00,
    dueDate: '2024-02-15',
    status: 'Pending',
  },
  {
    id: 2,
    customer: 'Global Services Inc.',
    invoiceNumber: 'INV-102',
    amount: 7500.00,
    dueDate: '2024-02-20',
    status: 'Overdue',
  },
  {
    id: 3,
    customer: 'Digital Solutions Ltd.',
    invoiceNumber: 'INV-103',
    amount: 3200.00,
    dueDate: '2024-03-01',
    status: 'Paid',
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'success';
    case 'overdue':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};

const AccountsReceivable = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Accounts Receivable</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // Handle new receivable creation
            console.log('Add new receivable clicked');
          }}
        >
          New Invoice
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleReceivables.map((receivable) => (
              <TableRow key={receivable.id}>
                <TableCell>{receivable.customer}</TableCell>
                <TableCell>{receivable.invoiceNumber}</TableCell>
                <TableCell align="right">${receivable.amount.toFixed(2)}</TableCell>
                <TableCell>{receivable.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    label={receivable.status}
                    color={getStatusColor(receivable.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => {
                      // Handle view/edit action
                      console.log('View/Edit clicked for', receivable.id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      // Handle mark as paid action
                      console.log('Mark as paid clicked for', receivable.id);
                    }}
                  >
                    Mark Paid
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

export default AccountsReceivable; 