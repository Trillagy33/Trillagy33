// App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PeopleSearch from './Pages/PeopleSearch/PeopleSearch';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/people-search" element={<PeopleSearch />} />
                    <Route path="/features" element={
                        <div className="placeholder-page">
                            <h1>Features</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                    <Route path="/pricing" element={
                        <div className="placeholder-page">
                            <h1>Pricing</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                    <Route path="/about" element={
                        <div className="placeholder-page">
                            <h1>About</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                    <Route path="/privacy" element={
                        <div className="placeholder-page">
                            <h1>Privacy Policy</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                    <Route path="/terms" element={
                        <div className="placeholder-page">
                            <h1>Terms of Service</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div className="placeholder-page">
                            <h1>Contact</h1>
                            <p>Coming Soon...</p>
                        </div>
                    } />
                </Routes>
                <footer className="app-footer">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h3>Trillagy</h3>
                            <p>Discover. Connect. Grow.</p>
                        </div>
                        <nav className="footer-nav">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;