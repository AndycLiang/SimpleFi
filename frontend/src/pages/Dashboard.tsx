import React from 'react';
import {
  Grid,
  Tab,
  Tabs,
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const theme = useTheme();

  // Sample data - in a real app, this would come from your API
  const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Cash Flow',
        data: [30000, 35000, 32000, 38000, 42000, 45000],
        borderColor: theme.palette.primary.main,
        tension: 0.1,
      },
    ],
  };

  const accountsStatusData = {
    labels: ['Accounts Receivable', 'Accounts Payable'],
    datasets: [
      {
        data: [63000, 42000],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.error.main,
        ],
      },
    ],
  };

  return (
    <Box>
        <Typography variant="h4" gutterBottom>
          Financial Dashboard
        </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="dashboard tabs">
        <Tab label="Overview" />
        <Tab label="Profit & Loss" />
        <Tab label="Balance Sheet" />
        <Tab label="Cash Flow" />
      </Tabs>

      {selectedTab === 0 && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Summary Cards */}
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h5">$245,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Expenses
                  </Typography>
                  <Typography variant="h5">$182,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Net Profit
                  </Typography>
                  <Typography variant="h5">$63,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Cash Balance
                  </Typography>
                  <Typography variant="h5">$128,000</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Cash Flow Trend
                </Typography>
                <Line
                  data={cashFlowData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                    },
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Accounts Status
                </Typography>
                <Doughnut
                  data={accountsStatusData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                      },
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Recent Transactions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Transactions
                </Typography>
                {/* Add a table or list of recent transactions here */}
                <Typography color="textSecondary">
                  Coming soon: Recent transaction history
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Profit & Loss Report (Coming Soon)</Typography>
        </Box>
      )}

      {selectedTab === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Balance Sheet Report (Coming Soon)</Typography>
        </Box>
      )}

      {selectedTab === 3 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Cash Flow Statement (Coming Soon)</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard; 