import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  MenuItem,
  IconButton, SelectChangeEvent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import api from '../api'; // Assuming you'll add these to api.ts

interface Account {
  id: number;
  account_code: string;
  account_name: string;
  account_type: string;
  parent_account_id?: number;
}

interface JournalItem {
  account_id: number;
  debit: number;
  credit: number;
  id?: number; // Add optional id for existing journal items
}

interface JournalEntry {
  id: number;
  date: string;
  description: string;
  created_at: string; // Assuming a timestamp field exists
  journal_items: JournalItem[];
}

type NewJournalEntryState = Omit<JournalEntry, 'id'> | JournalEntry;

const JournalEntries: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newJournalEntry, setNewJournalEntry] = useState<NewJournalEntryState>({
    created_at: '',
    date: '',
 // Initialize parent_account_id as undefined for new entries
    description: '',
    journal_items: [{ account_id: 0, debit: 0, credit: 0 }],
  });

  useEffect(() => {
    fetchJournalEntries();
    fetchAccounts();
  }, []);

  const fetchJournalEntries = async () => {
    try {
      const response = await api.getJournalEntries(); // Assuming getJournalEntries exists in api.ts
      setJournalEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await api.getAccounts(); // Assuming getAccounts exists in api.ts
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target as { name: keyof NewJournalEntryState, value: any };
    const fieldName = name as keyof NewJournalEntryState;
  
    setNewJournalEntry(prevEntry => ({
      ...prevEntry,
      [fieldName]: value,
    }));
  };

  const handleJournalItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
    const { name, value } = e.target as { name: keyof JournalItem, value: any };
    const updatedItems = [...newJournalEntry.journal_items] as JournalItem[];

    if (name === 'account_id') {
        updatedItems[index] = { ...updatedItems[index], [name]: Number(value) };
    } else {
        updatedItems[index] = { ...updatedItems[index], [name]: parseFloat(value as string) || 0 };
    }
    setNewJournalEntry({ ...newJournalEntry, journal_items: updatedItems });
  };

  const handleAddItem = () => {
    setNewJournalEntry({
      ...newJournalEntry,
      journal_items: [...newJournalEntry.journal_items, { account_id: 0, debit: 0, credit: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = newJournalEntry.journal_items.filter((_, i) => i !== index);
    setNewJournalEntry({ ...newJournalEntry, journal_items: updatedItems });
  };

  const validateJournalEntry = () => {
    const totalDebit = newJournalEntry.journal_items.reduce((sum, item) => sum + item.debit, 0);
    const totalCredit = newJournalEntry.journal_items.reduce((sum, item) => sum + item.credit, 0);
    return totalDebit === totalCredit;
  };

  const handleSaveJournalEntry = async () => {
    try {
      if (!validateJournalEntry()) {
        alert('Total debits must equal total credits.');
        return;
      }

      // Check if it's an existing entry and ensure id is treated as a number
      if ('id' in newJournalEntry && typeof newJournalEntry.id === 'number') {
         // Assuming updateJournalEntry exists and takes id and data
         await api.updateJournalEntry(newJournalEntry.id, newJournalEntry);
         alert('Journal entry updated successfully!');
      } else {
        await api.createJournalEntry(newJournalEntry); // Assuming createJournalEntry exists in api.ts
        alert('Journal entry added successfully!');
      }

      setNewJournalEntry({ created_at: '', date: '', description: '', journal_items: [{ account_id: 0, debit: 0, credit: 0 }] });
      fetchJournalEntries(); // Refresh the list
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const handleEditJournalEntry = (entry: JournalEntry) => {
      // Need to spread the journal_items to create new objects
      setNewJournalEntry({ ...entry, journal_items: entry.journal_items.map(item => ({...item})) });
  };

  const handleDeleteJournalEntry = async (id: number) => {
    try {
      // Assuming deleteJournalEntry exists and takes id
      await api.deleteJournalEntry(id);
      fetchJournalEntries(); // Refresh the list
      alert('Journal entry deleted successfully!');
    } catch (error) {
      console.error('Error adding journal entry:', error);
    }
  };


  return (
  <>
      <Typography variant="h4" gutterBottom>
        Journal Entries
      </Typography>

      <Typography variant="h5" gutterBottom>
        { 'id' in newJournalEntry ? 'Edit Journal Entry' : 'Add New Journal Entry' }
      </Typography>
      <Grid container spacing={2} component={Paper} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={newJournalEntry.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            name="description"
            value={newJournalEntry.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        {newJournalEntry.journal_items.map((item, index) => (
          <Grid container item spacing={2} key={index} alignItems="center">
            <Grid item xs={4}>
              <TextField
                select
                label="Account"
                value={item.account_id}
                name="account_id"
                onChange={(e) => handleJournalItemChange(index, e as SelectChangeEvent<number>)}
                fullWidth
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {`${account.account_code} - ${account.account_name}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Debit"
                type="number"
                name="debit"
                value={item.debit}
                onChange={(e) => handleJournalItemChange(index, e as React.ChangeEvent<HTMLInputElement>)} // Cast to HTMLInputElement
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Credit"
                type="number"
                name="credit"
                value={item.credit}
                onChange={(e) => handleJournalItemChange(index, e as React.ChangeEvent<HTMLInputElement>)} // Cast to HTMLInputElement
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveItem(index)} color="secondary">
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button onClick={handleAddItem} startIcon={<AddIcon />}>
            Add Journal Item
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSaveJournalEntry}>
            { 'id' in newJournalEntry ? 'Save Journal Entry' : 'Add Journal Entry' }
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Existing Journal Entries
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journalEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{entry.created_at}</TableCell>
                <TableCell>
                  <ul>
                    {entry.journal_items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {accounts.find(acc => acc.id === item.account_id)?.account_name || 'Unknown Account'}: Debit {item.debit}, Credit {item.credit}

                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                    <IconButton onClick={() => handleEditJournalEntry(entry)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteJournalEntry(entry.id)} color="secondary">
                         <RemoveIcon />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

export default JournalEntries;