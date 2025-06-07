import mongoose from 'mongoose'
 const EducationSchema = new mongoose.Schema({
    institution: {
        type: String,
        trim: true,
        required: 'Institution is required'
    },
    degree: {
        type: String,
        trim: true,
        unique: 'Degree already exists',
        required: 'Degree is required'
    },
    graddate: {
        type: Date,
        required: 'Graduation date is required'
    },
    accomplishments: {
        type: String,
        trim: true
    },
    courses: {
        type: Array,
        trim: true,
        default: []
    },
    imgurl: {
        type: String,
        required: 'Image URL is required',
        default: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Comingsoon.png'
    },
    salt: String
 });

 export default mongoose.model('Education', EducationSchema);