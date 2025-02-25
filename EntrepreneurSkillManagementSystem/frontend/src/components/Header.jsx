// Header.jsx
import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Header = ({pagename}) => {
    const [user, setUser ] = useState({ name: 'User ' }); // Default name to 'User '
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });
                setUser (data.user); // Set user data
            } catch (err) {
                console.error("Error fetching user profile:", err);
                setUser ({ name: 'User ' }); // Fallback to default name
                setTimeout(() => navigate("/login"), 1000); // Redirect to login
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the profile page
    };

    const isActive = (path) => location.pathname === path;

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDrawerOpen(false); // Close the drawer after navigation
    };

    if (loading) return <div>Loading...</div>; // Loading state

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#000000', height: '80px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
                <Toolbar sx={{ height: '80px', display: 'flex', justifyContent: 'space-between', padding: '0 25px' }}>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        {pagename} {/* Display user name */}
                    </Typography>
                    <IconButton
                        edge="end"
                        color={isActive('/profile') ? 'primary' : 'inherit'} // Highlight if active
                        onClick={handleProfileClick}
                    >
                        <AccountCircle fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, backgroundColor: '#000000', height: '100%', display: 'flex', flexDirection: 'column' }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {/* Profile Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '1px solid #444' }}>
                        <img 
                            src='https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg' // Default profile picture
                            alt="Profile"
                            style={{ borderRadius: '50%', width: '100px', height: '100px', marginRight: '10px' }}
                        />
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {user.name}
                        </Typography>
                    </Box>

                    {/* Navigation List */}
                    <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                        <ListItem button onClick={() => handleNavigation('/home')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/home') ? '#C 8791D' : 'white' }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/dashboard')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/dashboard') ? '#C8791D' : 'white' }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/forum')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/forum') ? '#C8791D' : 'white' }}>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Discussions" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/mentor')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/mentor') ? '#C8791D' : 'white' }}>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mentor Connect" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/fitness')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/fitness') ? '#C8791D' : 'white' }}>
                                <FitnessCenterIcon />
                            </ListItemIcon>
                            <ListItemText primary="Health & Fitness" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/forum')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/forum') ? '#C8791D' : 'white' }}>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/logout')} sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ color: isActive('/logout') ? '#C8791D' : 'white' }}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Header;