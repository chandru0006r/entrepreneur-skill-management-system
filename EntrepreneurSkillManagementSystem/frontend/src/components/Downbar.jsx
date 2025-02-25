// DownBar.jsx
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonIcon from '@mui/icons-material/Person';

const DownBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Box 
            sx={{
                position: 'fixed',
                bottom: '20px', // Adjusted to create a floating effect
                left: '50%',
                transform: 'translateX(-50%)', // Center horizontally
                width: '90%', // Set width to 90% of the screen
                backgroundColor: '#050505',
                padding: '15px', // Padding for height
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)', // Enhanced shadow for floating effect
                zIndex: 1000,
                borderRadius: '20px', // Rounded corners
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton 
                    sx={{ color: isActive('/dashboard') ? '#C8791D' : 'white' }} // Highlight if active
                    onClick={() => navigate('/dashboard')}
                >
                    <HomeIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton 
                    sx={{ color: isActive('/courses') ? '#C8791D' : 'white' }} // Highlight if active
                    onClick={() => navigate('/courses')}
                >
                    <DashboardIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton 
                    sx={{ color: isActive('/chat') ? '#C8791D' : 'white' }} // Highlight if active
                    onClick={() => navigate('/chat')}
                >
                    <ExtensionIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton 
                    sx={{ color: isActive('/about') ? '#C8791D' : 'white' }} // Highlight if active
                    onClick={() => navigate('/about')}
                >
                    <PersonIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default DownBar;