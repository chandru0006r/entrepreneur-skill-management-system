import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        { withCredentials: true }
      );
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#191919"
      padding={2}
    >
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
          Login
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field, index) => (
            <TextField
              key={index}
              fullWidth
              margin="normal"
              type={field === "password" ? "password" : "text"}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              autoComplete="email"
              required
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                input: { color: "white" },
                label: { color: "gray" },
                fieldset: { borderColor: "#C8791D !important" },
                "&:hover fieldset": { borderColor: "#C8791D !important" },
                "&.Mui-focused fieldset": { borderColor: "#C8791D !important" },
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#C8791D",
              color: "white",
              "&:hover": { bgcolor: "#A3621A" },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography mt={2} color="white">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#F4A261", textDecoration: "none" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;


