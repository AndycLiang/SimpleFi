import axios from 'axios';

export enum AccountTypeEnum {
  Asset = 'Asset',
  Liability = 'Liability',
  Equity = 'Equity',
  Revenue = 'Revenue',
  Expense = 'Expense',
}

const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend URL

const api = {
  getAccounts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },

  createAccount: async (accountData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounts`, accountData);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  getJournalEntries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/journal_entries`);
      return response.data;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  },

  createJournalEntry: async (journalEntryData: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/journal_entries`, journalEntryData);
      return response.data;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  },

  updateJournalEntry: async (journalEntryId: number, journalEntryData: any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/journal_entries/${journalEntryId}`, journalEntryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating journal entry with ID ${journalEntryId}:`, error);
      throw error;
    }
  },

  deleteJournalEntry: async (journalEntryId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/journal_entries/${journalEntryId}`);
    } catch (error) {
      console.error(`Error deleting journal entry with ID ${journalEntryId}:`, error);
      throw error;
    }
  },

  // Add other API functions as needed (e.g., updateAccount, deleteAccount)
};

export default api;