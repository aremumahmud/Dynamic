import './App.css'
import './styles/theme.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import Scheduling from './pages/Scheduling'
import ReferUs from './pages/ReferUs'


// console.log()

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:jobId" element={<JobDetail />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/refer-us" element={<ReferUs />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
