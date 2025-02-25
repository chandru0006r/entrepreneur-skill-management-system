import React, { useEffect, useState } from 'react';
import courseData from './course.json'; // Adjust the path if necessary
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
} from '@mui/material';
import Header from '../components/Header';
import DownBar from '../components/Downbar';

const CourseCard = ({ course }) => {
    return (
        <Card 
            sx={{ 
                borderRadius: 3,
                margin: 2, 
                boxShadow: 3, 
                backgroundColor: '#000000', 
                color: 'white', 
                transition: 'transform 0.2s', 
                '&:hover': { transform: 'scale(1.02)' } 
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {course.courseName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#a1a1a1">
                    Completion Status: {course.completionStatus}%
                </Typography>
                <Typography variant="body2" color="white">
                    {course.courseDescription}
                </Typography>
                <Button 
                    variant="contained" 
                    color="white" 
                    href={course.courseLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    sx={{ marginTop: 2, backgroundColor: '#C8791D', '&:hover': { backgroundColor: '#C8791D' } }}
                >
                    View Course
                </Button>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Key Skills:
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {course.keySkills.map((skill, index) => (
                        <li key={index}>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    backgroundColor: '#C8791D', 
                                    borderRadius: 1, 
                                    padding: 0.5, 
                                    margin: 0.5,
                                    mb: 1.5
                                }}
                            >
                                {skill}
                            </Typography>
                        </li>
                    ))}
                </ul>
                <Typography variant="caption" color="text.secondary">
                    Created At: {new Date(course.createdAt).toLocaleDateString()} | Updated At: {new Date(course.updatedAt).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

const CoursesPage = () => {
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');

    const majorSkills = [
        {
            name: "Business & Strategy",
            miniSkills: ["Market Analysis", "Financial Planning", "Risk Management", "Strategic Planning", "Business Model Design"]
        },
        {
            name: "Leadership & Management",
            miniSkills: ["Decision Making", "Team Management", "Conflict Resolution", "Emotional Intelligence", "Change Management"]
        },
        {
            name: "Sales & Marketing",
            miniSkills: ["Digital Marketing", "SEO & SEM", "Content Marketing"]
        },
        {
            name: "Communication & Networking",
            miniSkills: ["Public Speaking", "Active Listening", "Presentation Skills"]
        },
        {
            name: "Technical & Digital Skills",
            miniSkills: ["Coding", "Data Science", "Web Development"]
        },
        {
            name: "Personal Fitness & Well-being",
            miniSkills: ["Stress Management", "Yoga & Meditation"]
        },
        {
            name: "Self-Improvement & Learning",
            miniSkills: ["Time Management", "Creativity", "Public Speaking"]
        }
    ];

    useEffect(() => {
        // Set the initial courses from the imported JSON data
        setFilteredCourses(courseData);
    }, []);

    const handleSkillChange = (event) => {
        const selectedSkillName = event.target.value;
        setSelectedSkill(selectedSkillName);

        const selectedSkillGroup = majorSkills.find(skill => skill.name === selectedSkillName);
        if (selectedSkillGroup) {
            const filtered = courseData.filter(course => 
                course.keySkills.some(keySkill => selectedSkillGroup.miniSkills.includes(keySkill))
            );
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses(courseData); // Reset to all courses if no skill is selected
        }
    };

    return (
        <Container>
            <Header pagename="Courses"/>
 <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 15, border: '1px solid white', borderRadius: 1 }}>
                <InputLabel id="skill-select-label" sx={{ color: 'white' }}>Filter by Major Skills</InputLabel>
                <Select
                    labelId="skill-select-label"
                    value={selectedSkill}
                    onChange={handleSkillChange}
                    sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' }, backgroundColor: 'transparent' }}
                >
                    {majorSkills.map((skill, index) => (
                        <MenuItem key={index} value={skill.name}>
                            {skill.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                {filteredCourses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CourseCard course={course} />
                    </Grid>
                ))}
            </Grid>
            <DownBar/>
        </Container>
    );
};

export default CoursesPage;