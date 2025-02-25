import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatBubble = ({ text, role }) => {
    const isUser  = role === 'user';

    return (
        <Box
            sx={{
                maxWidth: '70%',
                margin: isUser  ? '10px auto 10px 0' : '10px 0 10px auto',
                padding: '10px',
                borderRadius: '20px',
                backgroundColor: isUser  ? '#fa8a00' : '#3e3e3e',
                color: '#fff',
                alignSelf: isUser  ? 'flex-end' : 'flex-start',
                wordWrap: 'break-word',
            }}
        >
            <Typography variant="body1">{text}</Typography>
        </Box>
    );
};

export default ChatBubble;