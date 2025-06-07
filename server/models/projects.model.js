import mongoose from 'mongoose'
 const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    description: {
        type: String,
        trim: true,
        default: 'This project is currently under early development, check back soon for an official description.',
    },
    roledescription: {
        type: String,
        trim: true,
        default: 'In this project I had the opportunity to work on various aspects of the application. In addition, I learned numerous new skills and technologies that I look forward to bringing to future projects.',
    },
    repolink: {
        type: String,
        default: 'https://github.com/TheGuy3201',
    },
    imgurl: {
        type: Array,
        required: 'Image URL is required',
        default: ['https://upload.wikimedia.org/wikipedia/commons/8/80/Comingsoon.png']
    },
        salt: String
 });

 export default mongoose.model('Project', ProjectSchema);