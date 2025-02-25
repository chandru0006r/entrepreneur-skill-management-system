import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Modal, Button, Card, CardContent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DownBar from '../components/Downbar';
import Header from '../components/Header';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [view, setView] = useState('onProgress'); // State to manage the current view
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });
                setUserId(data.user.id);
                console.log("Fetched User ID:", data.user.id);
            } catch (err) {
                console.error("Failed to fetch user ID:", err);
                setError("Failed to fetch user ID. Redirecting to login.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchSkillsData = async () => {
            if (!userId) return;
            try {
                console.log(`Fetching skills data from: http://localhost:5000/api/skills/assign/${userId}`);
                const response = await axios.get(`http://localhost:5000/api/skills/assign/${userId}`, {
                    withCredentials: true,
                });
                const skills = response.data.skills;
                const transformedData = skills.map(skill => ({
                    name: skill.name,
                    percentage: skill.percentage,
                }));
                setData(transformedData);
            } catch (err) {
                setError("Failed to fetch skills data.");
                console.error("Error fetching skills data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkillsData();
    }, [userId]);

    const handleSkillClick = (skillName) => {
        setSelectedSkill(skillName);
    };

    const handleCloseModal = () => {
        setSelectedSkill(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    // Sample data for On-Progress and To-Do lists
    const onProgressTasks = [
        "Complete React project",
        "Study for JavaScript exam",
        "Finish reading 'Clean Code'"
    ];

    const todoTasks = [
        "Learn TypeScript",
        "Start a new project on GitHub",
        "Attend the next coding workshop"
    ];

    return (
        <Container>
            <Header pagename={"Dashboard"} />
            <Typography variant="h4" gutterBottom>
                Skills Radar Chart
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <RadarChart height={400} width={400} outerRadius="70%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <Tooltip />
                    <Radar 
                        dataKey="percentage" 
                        stroke="#fa8a00" 
                        fill="#fa8a00" 
                        fillOpacity={0.3} 
                        onClick={(e) => handleSkillClick(e.name)} 
                    />
                </RadarChart>
            </Box>
            <DownBar />

            {/* Modal for Skill Details */}
            <Modal
                open={Boolean(selectedSkill)}
                onClose={handleCloseModal}
                aria-labelledby="skill-modal-title"
                aria-describedby="skill-modal-description"
            >
                <Box sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    boxShadow: 24,
                    p: 4, 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', transform: 'translate(-50%, -50%)', 
                    width: 300 
                }}>
                    <Typography id="skill-modal-title" variant="h6" component="h2">
                        Skill Details: {selectedSkill}
                    </Typography>
                    <Typography id="skill-modal-description" sx={{ mt: 2 }}>
                        Here you can add more information about the skill, such as its importance, resources to improve, and related courses.
                    </Typography>
                    <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Toggle Buttons for On-Progress and To-Do */}
            <Box sx={{ marginTop: 4,mb:30,  bgcolor: 'black', border: '2px solid #c8791d', borderRadius: 2, padding: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                    Tasks
                </Typography>
                <ToggleButtonGroup
    value={view}
    exclusive
    onChange={(event, newView) => {
        if (newView) {
            setView(newView);
        }
    }}
    aria-label="task view"
    sx={{ marginBottom: 2, width: '100%' }}
>
<ToggleButton 
    value="onProgress" 
    aria-label="on-progress" 
    sx={{ 
        backgroundColor: view === 'onProgress' ? '#c8791d' : 'transparent', 
        color: 'white', 
        borderRadius:'5px',
        fontWeight: 'bold',
        flex: 1, 
        '&.Mui-selected': { 
            backgroundColor: '#c8791d !important', 
            color: 'white' 
        },
        '&:hover': { 
            backgroundColor: '#a3621a' 
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#c8791d !important'
        }
    }}
>
    On-Progress
</ToggleButton>

<ToggleButton 
    value="toDo" 
    aria-label="to-do" 
    sx={{ 
        backgroundColor: view === 'toDo' ? '#c8791d' : 'transparent', 
        color: 'white', 
        borderRadius:'5px',
        fontWeight: 'bold',
        flex: 1, 
        '&.Mui-selected': { 
            backgroundColor: '#c8791d !important', 
            color: 'white' 
        },
        '&:hover': { 
            backgroundColor: '#a3621a' 
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#c8791d !important'
        }
    }}
>
    To-Do
</ToggleButton>

</ToggleButtonGroup>


                {/* Task Lists */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {view === 'onProgress' && onProgressTasks.map((task, index) => (
                        <Card key={index} sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                            <CardContent>
                                <Typography variant="body1">{task}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                    {view === 'toDo' && todoTasks.map((task, index) => (
                        <Card key={index} sx={{ color:"#ffffff",backgroundColor: '#000000' ,border:"1px solid #afafaf"}}>
                            <CardContent>
                                <Typography variant="body1">{task}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Dashboard;