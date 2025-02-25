import React, { useState } from 'react';
import { Container, TextField, Button, Box, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Header from '../components/Header';
import DownBar from '../components/Downbar';
import ChatBubble from '../components/ChatBubble'; // Import the ChatBubble component

const ChatPage = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { role: 'user', text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');

        try {
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama3.2",  // Replace with the model name you're using
                    messages: [{ role: 'user', content: input }]
                }),
            });

            if (response.ok) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let done, value;

                let aiResponse = '';

                // Create a placeholder for the AI message
                const aiMessage = { role: 'ai', text: '' };
                setMessages((prev) => [...prev, aiMessage]); // Add the AI message placeholder

                while ({ done, value } = await reader.read(), !done) {
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line) {
                            try {
                                const jsonData = JSON.parse(line);
                                if (jsonData.message && jsonData.message.content) {
                                    const newContent = jsonData.message.content;

                                    // Update the AI message incrementally
                                    for (let char of newContent) {
                                        aiResponse += char; // Append the new character
                                        setMessages((prev) => {
                                            const updatedMessages = [...prev];
                                            updatedMessages[updatedMessages.length - 1].text = aiResponse; // Update the last AI message
                                            return updatedMessages;
                                        });
                                        await new Promise(resolve => setTimeout(resolve, 50)); // Adjust the delay as needed
                                    }
                                }
                            } catch (error) {
                                console.error(`Failed to parse line: ${line}`);
                            }
                        }
                    }
                }
            } else {
                console.error(`Error: ${response.status}`);
                const errorText = await response.text();
                console.error(errorText);
            }
        } catch (error) {
            console.error('Chat request failed:', error);
        }
    };

    return (
        <Container 
            sx={{ 
                height: '80vh', 
                width: '100vw', // Ensure the container takes full width
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: 'transparent',
                padding: 0 // Remove default padding
            }}
        >
            <Header pagename="AI Chat" />
            <Paper 
                elevation={3} 
                sx={{ 
                    flex: 1, 
                    padding: 2, 
                    overflowY: 'auto', 
                    background: 'transparent' 
                }}
            >
                <Box display="flex" flexDirection="column">
                    {messages.map((msg, index) => (
                        <ChatBubble key={index} text={msg.text} role={msg.role} />
                    ))}
                </Box>
            </Paper>
            <Box display="flex" alignItems="center" sx={{ padding: 1 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    sx={{ background: '#fff', borderRadius: '5px' }} // Style adjustments
                />
                <Button 
                    onClick={handleSend} 
                    variant="contained" 
                    // color="primary" 
                    sx={{ marginLeft: 1, height: '100%', borderRadius: '5px',backgroundColor:"#fa8a00" }} // Adjust button style
                >
                    <SendIcon />
                </Button>
            </Box>
            <DownBar />
        </Container>
    );
};

export default ChatPage;