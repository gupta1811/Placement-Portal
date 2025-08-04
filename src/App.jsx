import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompanyDetails from './pages/CompanyDetails';
import AdminPanel from './pages/AdminPanel';
import StudentDashboard from './pages/StudentDashboard';
import NotFound from './pages/NotFound';
import './App.css';
import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

const clerkFrontendApi = 'YOUR_CLERK_FRONTEND_API';

<ClerkProvider frontendApi={clerkFrontendApi}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ClerkProvider>


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
