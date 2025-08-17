import React, { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PerformanceProvider from './lib/PerformanceContext'
import AdminRoute from './lib/AdminRoute'
import auth from './lib/auth-helper'

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
const EducationList = lazy(() => import('./Education/EducationList.jsx'))
const EducationForm = lazy(() => import('./Education/EducationForm.jsx'))
const EditEducation = lazy(() => import('./Education/EditEducation.jsx'))
const ProjectForm = lazy(() => import('./Project/ProjectForm.jsx'))
const ContactList = lazy(() => import('./Contact/ContactList.jsx'))
const AdminDashboard = lazy(() => import('./user/AdminDashboard.jsx'))
const ServiceForm = lazy(() => import('./Service/ServiceForm.jsx'))
const ServiceList = lazy(() => import('./Service/ServiceList.jsx'))

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
                        <Route path="/admin" element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } />
                        <Route path="/users" element={
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        } />
                        <Route path="/user/:userId" element={<Profile />} />
                        <Route path="/admin/education" element={
                            <AdminRoute>
                                <EducationList />
                            </AdminRoute>
                        } />
                        <Route path="/admin/education/new" element={
                            <AdminRoute>
                                <EducationForm />
                            </AdminRoute>
                        } />
                        <Route path="/admin/education/edit/:educationId" element={
                            <AdminRoute>
                                <EditEducation />
                            </AdminRoute>
                        } />
                        <Route path="/admin/projects/new" element={
                            <AdminRoute>
                                <ProjectForm />
                            </AdminRoute>
                        } />
                        <Route path="/admin/contacts" element={
                            <AdminRoute>
                                <ContactList />
                            </AdminRoute>
                        } />
                        <Route path="/admin/services" element={
                            <AdminRoute>
                                <ServiceList />
                            </AdminRoute>
                        } />
                        <Route path="/admin/services/new" element={
                            <AdminRoute>
                                <ServiceForm />
                            </AdminRoute>
                        } />
                    </Routes>
                </Suspense>
            </div>
        </PerformanceProvider>
    )
}

export default MainRouter