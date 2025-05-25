import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]); // To store chat messages

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, `You: ${message}`]);

    // TODO: Call your LLM API here

    setMessage(''); // Clear the input field
  };

  return (
    <Box
      sx={{
        position: 'fixed', // Fix the position on the screen
        bottom: 20, // Adjust bottom spacing as needed
        right: 20, // Adjust right spacing as needed
        zIndex: 1000, // Ensure it's above other content
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {isOpen && (
        <Paper
          sx={{
            width: 300, // Adjust chat window width
            height: 400, // Adjust chat window height
            marginBottom: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 1 }}>
            {/* Display chat history */}
            {chatHistory.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Box>
          <TextField
            label="Ask the AI..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button variant="contained" onClick={handleSendMessage} sx={{ marginTop: 1 }}>
            Send
          </Button>
        </Paper>
      )}
      <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </Button>
    </Box>
  );
};

export default ChatBubble;