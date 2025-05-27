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
  Chip
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { Add as AddIcon } from '@mui/icons-material';

const BACKEND_URL = "8000-firebase-simplefi-2-1747857224566.cluster-hf4yr35cmnbd4vhbxvfvc6cp5q.cloudworkstations.dev"

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AccountsPayable = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode | null>(
    null
  );

  const handleCloseModal = () => setModalOpen(false);

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
                <TableCell>
                  <Chip
                      label={payable.status}
                      color={getStatusColor(payable.status) as any}
                      size="small"
                    />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={async () => {
                      // Attempt to fetch PDF from backend
                      try {
                        console.log(`${BACKEND_URL}/invoices/${payable.id}/pdf`);
                        const response = await fetch(`${BACKEND_URL}/invoices/${payable.id}/pdf`); // Replace with your actual API endpoint
                        if (response.ok) {
                          console.log(response);
                          const blob = await response.blob();
                          const pdfUrl = URL.createObjectURL(blob);
                          console.log(pdfUrl);
                          console.log("HI");
                          setModalContent(
                            <iframe
                              src={`https://${BACKEND_URL}/static/storage/invoices/test_invoice.pdf`}
                              width="100%"
                              height="500px"
                            ></iframe>
                          );
                        } else {
                          // If no PDF, display invoice details
                          setModalContent(
                            <Typography>
                              Invoice Details: {JSON.stringify(payable)}
                            </Typography>
                          );
                        }
                      } catch (error) {}
                      setModalOpen(true);
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
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style}>{modalContent}</Box>
      </Modal>
    </Box>
  );
};

export default AccountsPayable; 