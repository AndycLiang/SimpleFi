import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data - in a real app, this would come from your API
const monthlyData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 34000, profit: 18000 },
  { month: 'Mar', revenue: 48000, expenses: 36000, profit: 12000 },
  { month: 'Apr', revenue: 51000, expenses: 35000, profit: 16000 },
  { month: 'May', revenue: 54000, expenses: 37000, profit: 17000 },
  { month: 'Jun', revenue: 58000, expenses: 39000, profit: 19000 },
];

const Reports = () => {
  const [reportType, setReportType] = useState('profit_loss');
  const [dateRange, setDateRange] = useState('last_6_months');

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Financial Reports
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                select
                label="Report Type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                fullWidth
              >
                <MenuItem value="profit_loss">Profit & Loss</MenuItem>
                <MenuItem value="balance_sheet">Balance Sheet</MenuItem>
                <MenuItem value="cash_flow">Cash Flow</MenuItem>
                <MenuItem value="accounts_aging">Accounts Aging</MenuItem>
              </TextField>

              <TextField
                select
                label="Date Range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                fullWidth
              >
                <MenuItem value="last_month">Last Month</MenuItem>
                <MenuItem value="last_3_months">Last 3 Months</MenuItem>
                <MenuItem value="last_6_months">Last 6 Months</MenuItem>
                <MenuItem value="year_to_date">Year to Date</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </TextField>

              <Button variant="contained" fullWidth>
                Generate Report
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Profit & Loss Overview
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2196f3" name="Revenue" />
                  <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
                  <Bar dataKey="profit" fill="#4caf50" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h5">
                    ${monthlyData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Expenses
                  </Typography>
                  <Typography variant="h5">
                    ${monthlyData.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Net Profit
                  </Typography>
                  <Typography variant="h5">
                    ${monthlyData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 