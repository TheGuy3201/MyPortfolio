import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Education from './components/Education'
import Project from './components/Project'
import Layout from './components/Layout'
import Services from './components/Services'
import Signup from "./user/Signup.jsx";
import Signin from './lib/Signin.jsx'
import Users from './user/Users.jsx'
import Profile from './user/Profile.jsx'
import EducationList from './user/EducationList.jsx'
import EducationForm from './user/EducationForm.jsx'
import EditEducation from './user/EditEducation.jsx'
import ProjectForm from './user/ProjectForm.jsx'
import ContactList from './user/ContactList.jsx'
import AdminDashboard from './user/AdminDashboard.jsx'
import ServiceForm from './user/ServiceForm.jsx'
import ServiceList from './user/ServiceList.jsx'
const MainRouter = () => {
    return (
        <div>
            <Layout/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/education" element={<Education />} />
                <Route path="/project" element={<Project />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:userId" element={<Profile />} />
                <Route path="/admin/education" element={<EducationList />} />
                <Route path="/admin/education/new" element={<EducationForm />} />
                <Route path="/admin/education/edit/:educationId" element={<EditEducation />} />
                <Route path="/admin/projects/new" element={<ProjectForm />} />
                <Route path="/admin/contacts" element={<ContactList />} />
                <Route path="/admin/services" element={<ServiceList />} />
                <Route path="/admin/services/new" element={<ServiceForm />} />
            </Routes>
        </div>
    )
}
export default MainRouter