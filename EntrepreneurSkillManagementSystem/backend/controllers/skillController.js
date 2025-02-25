import SkillModel from "../models/skillModel.js";

// skill database create panrom and athae user id oda another set kuduthaa athula anthaa percentage matu change agum 
export const createOrUpdateSkills = async (req, res) => {
    const { userId, skills } = req.body;

    try {
        const existingSkills = await SkillModel.findOneAndUpdate(
            { userId },
            { skills },
            { new: true, upsert: true }
        );
        res.status(200).json(existingSkills);
    } catch (error) {
        res.status(500).json({ message: 'Error saving skills', error });
    }
};

// skills set ah vangurom
export const getUserSkills = async (req, res) => {
    const { userId } = req.params;

    try {
        const userSkills = await SkillModel.findOne({ userId });
        if (!userSkills) {
            return res.status(404).json({ message: 'User  skills not found' });
        }
        res.status(200).json(userSkills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skills', error });
    }
};