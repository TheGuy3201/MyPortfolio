import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PerformanceProvider from './lib/PerformanceContext'

// Lazy load components for code splitting
const Home = lazy(() => import('./components/Home'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Education = lazy(() => import('./components/Education'))
const Project = lazy(() => import('./components/Project'))
const Services = lazy(() => import('./components/Services'))
const Signup = lazy(() => import("./user/Signup.jsx"))
const Signin = lazy(() => import('./lib/Signin.jsx'))
const Users = lazy(() => import('./user/Users.jsx'))
const Profile = lazy(() => import('./user/Profile.jsx'))
const EducationList = lazy(() => import('./user/EducationList.jsx'))
const EducationForm = lazy(() => import('./user/EducationForm.jsx'))
const EditEducation = lazy(() => import('./user/EditEducation.jsx'))
const ProjectForm = lazy(() => import('./user/ProjectForm.jsx'))
const ContactList = lazy(() => import('./user/ContactList.jsx'))
const AdminDashboard = lazy(() => import('./user/AdminDashboard.jsx'))
const ServiceForm = lazy(() => import('./user/ServiceForm.jsx'))
const ServiceList = lazy(() => import('./user/ServiceList.jsx'))

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '18px' 
  }}>
    Loading...
  </div>
)

const MainRouter = () => {
    return (
        <PerformanceProvider>
            <div>
                <Layout/>
                <Suspense fallback={<LoadingSpinner />}>
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
                </Suspense>
            </div>
        </PerformanceProvider>
    )
}

export default MainRouter