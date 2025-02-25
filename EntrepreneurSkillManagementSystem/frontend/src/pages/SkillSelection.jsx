import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import Header from "../components/Header";


const skillData = [
  {
    name: "Business & Strategy",
    miniSkills: ["Market Analysis", "Financial Planning", "Risk Management", "Strategic Planning", "Business Model Design", "Competitive Analysis", "Innovation Management", "Product Management", "Market Research", "Business Forecasting", "Budget Management"]
  },
  {
    name: "Leadership & Management",
    miniSkills: ["Decision Making", "Team Management", "Conflict Resolution", "People Management", "Delegation", "Emotional Intelligence", "Change Management", "Performance Management", "Leadership Styles", "Coaching & Mentoring", "Crisis Management"]
  },
  {
    name: "Sales & Marketing",
    miniSkills: ["Digital Marketing", "Sales Tactics", "Branding", "SEO & SEM", "Content Marketing", "Market Segmentation", "Product Positioning", "Sales Forecasting", "Email Marketing", "Customer Relationship Management", "Affiliate Marketing"]
  },
  {
    name: "Communication & Networking",
    miniSkills: ["Public Speaking", "Negotiation", "Networking", "Persuasion", "Active Listening", "Conflict Resolution", "Written Communication", "Presentation Skills", "Cross-Cultural Communication", "Interpersonal Skills", "Media Relations"]
  },
  {
    name: "Technical & Digital Skills",
    miniSkills: ["Coding", "Cloud Computing", "Cybersecurity", "AI & Machine Learning", "Big Data Analytics", "Blockchain Technology", "Data Science", "Software Development", "App Development", "DevOps", "Web Development"]
  },
  {
    name: "Personal Fitness & Well-being",
    miniSkills: ["Exercise", "Mental Health", "Diet Planning", "Stress Management", "Sleep Hygiene", "Yoga & Meditation", "Healthy Eating", "Weight Management", "Mindfulness", "Cardiovascular Fitness", "Strength Training"]
  },
  {
    name: "Self-Improvement & Learning",
    miniSkills: ["Time Management", "Critical Thinking", "Creativity", "Emotional Intelligence", "Personal Branding", "Goal Setting", "Self-Discipline", "Adaptability", "Resilience", "Public Speaking", "Mindset Development"]
  }
];


const SkillSelection = () => {
  const [selectedSkills, setSelectedSkills] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold user ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUserId(data.user.id); // Set user ID from profile
      } catch (err) {
        console.error("Failed to fetch user ID:", err);
        navigate("/login"); // Redirect if fetching fails
      }
    };

    fetchUserId();
  }, [navigate]);

  const handleSkillSelect = (category, skill) => {
    if (submitted) return;
    setSelectedSkills((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [skill]: !prev[category]?.[skill],
      },
    }));
  };

  const handleNext = () => {
    if (currentCategoryIndex < skillData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const calculateSkillPercentages = () => {
    return skillData.map((category) => {
      const selectedCount = Object.values(selectedSkills[category.name] || {}).filter(Boolean).length;
      const totalSkills = category.miniSkills.length;
      const percentage = totalSkills > 0 ? Math.round((selectedCount / totalSkills) * 100) : 0;
      return { category: category.name, percentage };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const skillPercentages = calculateSkillPercentages();
    const resultJson = {
      userId, // Include user ID in the payload
      skills: skillData.map((category) => ({
        name: category.name,
        percentage: skillPercentages.find((p) => p.category === category.name)?.percentage || 0,
        miniSkills: category.miniSkills.map((skill) => ({
          name: skill,
          selected: selectedSkills[category.name]?.[skill] || false,
        })),
      })),
    };

    console.log("Final JSON Output:", JSON.stringify(resultJson, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/skills/assign",
        resultJson,
        { withCredentials: true }
      );
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Error occurred");
      setError("An error occurred while submitting");
    } finally {
      setLoading(false);
    }
    setSubmitted(true);
  };

  return (
    <Container position="fixed" sx={{ backgroundColor: "#000000", color: "white", pt:"50px",pb:"40px", borderRadius:"20px"}}>
      <Header />
      <Typography variant="h4" sx={{ marginBottom: '10px' }}>
    Skill Selection Made Easy
</Typography>
<Typography variant="body1">
    Please select your skills one-by-one to tailor your profile. This will help us understand your strengths better.
</Typography>

      <Paper sx={{ height:"100%", p: 4, backgroundColor: "transparent", color: "white", borderRadius: 2 }}>
        <Typography variant="h6" color="#C8791D" sx={{ mb: 2 }}>{skillData[currentCategoryIndex].name}</Typography>

        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {skillData[currentCategoryIndex].miniSkills.map((skill) => (
            <Button
              key={skill}
              variant="outlined"
              sx={{
                borderRadius: 5,
                border: "1px solid white",
                color: "white",
                textTransform: "none",
                backgroundColor: selectedSkills[skillData[currentCategoryIndex].name]?.[skill] ? "#C8791D" : "transparent",
                "&:hover": {
                  backgroundColor: "#C8791D",
                },
                marginBottom: "9px",
              }}
              onClick={() => handleSkillSelect(skillData[currentCategoryIndex].name, skill)}
              disabled={submitted}
            >
              {skill}
            </Button>
          ))}
        </Stack>
      </Paper>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#C8791D", color: "white", mt: 2}}
        onClick={handleNext}
        disabled={submitted || loading}
      >
        {loading ? "Submitting..." : currentCategoryIndex < skillData.length - 1 ? "Next" : "Submit"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default SkillSelection;