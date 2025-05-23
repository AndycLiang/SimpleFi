import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const AIChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
 
  const handleSendMessage = async () => {
    // Stub function to send message to backend
    console.log("Sending message:", message);
    setChatHistory([...chatHistory, `User: ${message}`]);
    setMessage('');
    // TODO: Call backend API to get response
    const aiResponse = await getAIResponse(message);
    setChatHistory(prevHistory => [...prevHistory, `AI: ${aiResponse}`]);
  };
 
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Stub function to receive response from backend
    return `This is a stub AI response to: "${userMessage}"`;
  };
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', backgroundColor: '#f0f4f9', padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#333', marginBottom: 3 }}>
        Gemini Accounting Assistant
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
        }}
      >
        {chatHistory.map((entry, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: entry.startsWith('User:') ? 'flex-end' : 'flex-start',
              marginBottom: 1,
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                padding: 1,
                borderRadius: 2,
                backgroundColor: entry.startsWith('User:') ? '#e3f2fd' : '#f5f5f5',
                maxWidth: '75%',
              }}
            >
              <Typography variant="body2">{entry.replace(/^(User|AI): /, '')}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <TextField
        label="Ask a question..."
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        sx={{ marginBottom: 2 }}
        InputProps={{
          sx: { borderRadius: 2, backgroundColor: '#fff' },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSendMessage}
        fullWidth
        sx={{ borderRadius: 2, padding: '12px 0' }}
      >
        Send
      </Button>
    </Box>
  );
};
export default AIChat;