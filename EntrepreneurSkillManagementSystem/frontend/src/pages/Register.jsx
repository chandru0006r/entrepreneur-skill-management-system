import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    userID: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setError(
        err.response?.data?.message ||
        (Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors.join(", ")
          : "Registration failed")
      );
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
          width: { xs: "90%", sm: "400px", md: "450px" }, // Responsive Width
          textAlign: "center",
          bgcolor: "#141414",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom color="white">
          Register
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          {["name", "userID", "email", "password"].map((field, index) => (
            <TextField
              key={index}
              fullWidth
              margin="normal"
              type={field === "password" ? "password" : "text"}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize First Letter
              value={formData[field]}
              onChange={handleChange}
              autoComplete={field}
              required
              InputProps={{
                style: { color: "white", borderColor: "red" },
              }}
              sx={{
                input: { color: "white" },
                label: { color: "gray" },
                fieldset: { borderColor: "#C8791D !important" }, // Custom Border Color
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
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Typography mt={2} color="white">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#F4A261", textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
