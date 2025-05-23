import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AccountsPayable from './pages/AccountsPayable';
import AccountsReceivable from './pages/AccountsReceivable';
import BankReconciliation from './pages/BankReconciliation';
import Reports from './pages/Reports';
import ChartOfAccounts from './pages/ChartOfAccounts';
import JournalEntries from 'pages/JournalEntries';
import AIChat from 'pages/AIChat';

// Create a client for React Query
const queryClient = new QueryClient();

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts-payable" element={<AccountsPayable />} />
              <Route path="/accounts-receivable" element={<AccountsReceivable />} />
              <Route path="/bank-reconciliation" element={<BankReconciliation />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
              <Route path="/journal-entries" element={<JournalEntries />} />
              <Route path="/ai-chat" element={<AIChat />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App; 