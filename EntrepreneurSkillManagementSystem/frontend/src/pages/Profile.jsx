import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import DownBar from "../components/Downbar.jsx";
import Header from "../components/Header.jsx";

const Profile = () => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/users/profile", {
                    withCredentials: true,
                });
                setUser (data.user);
            } catch (err) {
                setError(err.response?.data?.message || "Unauthorized access. Redirecting...");
                setTimeout(() => navigate("/login"), 1000);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        if (!window.confirm("Are you sure you want to logout?")) return;

        try {
            await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
            setUser (null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    if (loading) return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#191919"
            color="white"
        >
            <Typography>Loading Profile...</Typography>
        </Box>
    );

    if (error) return <p className="error">{error}</p>;

    return user ? (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#191919"
            padding={2}
        >
            <Header pagename="Profile" />
            <Paper
                elevation={3}
                sx={{
                    padding: { xs: 3, sm: 4, md: 5 },
                    width: { xs: "90%", sm: "400px", md: "450px" },
                    textAlign: "center",
                    bgcolor: "#141414",
                    color: "white",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" gutterBottom color="white">
                    Profile
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: "#C8791D" }}>
                            {user.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            User ID: {user.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            Email: {user.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            Phone: {user.phone || "N/A"} {/* Add phone field */}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            Address: {user.address || "N/A"} {/* Add address field */}
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    onClick={handleLogout}
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        bgcolor: "#C8791D",
                        color: "white",
                        "&:hover": { bgcolor: "#A3621A" },
                    }}
                >
                    Logout
                </Button>
            </Paper>
            <DownBar />
        </Box>
    ) : (
        <p className="error">Unauthorized. Redirecting...</p>
    );
};

export default Profile;