import mongoose from 'mongoose';

const miniSkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    selected: { type: Boolean, required: true }
});

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    miniSkills: [miniSkillSchema]
});

const userSkillsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    skills: [skillSchema]
});

const SkillModel = mongoose.model('User Skills', userSkillsSchema);

export default SkillModel;