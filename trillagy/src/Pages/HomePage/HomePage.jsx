// src/Pages/HomePage/HomePage.jsx
import React, { useState } from "react";
import PeopleSearch from "../PeopleSearch/PeopleSearch";
import CompanySearch from "../CompanySearch/CompanySearch";
import JobSearch from "../JobSearch/JobSearch";
// import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Import Navbar
import "./HomePage.scss";
import {
  FaSearch,
  FaBuilding,
  FaUser,
  FaArrowRight,
  FaBriefcase,
} from "react-icons/fa";

const HomePage = () => {
  const [searchType, setSearchType] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setSearchType(type);
    if (type === "people") {
      // navigate('/people-search');
      setSearchType("people");
      console.log(searchType);
    } else if (type === "company") {
      // navigate('/company-search');
      setSearchType("company");
      console.log(searchType);
    } else if (type === "jobs") {
      setSearchType("jobs");
      console.log(searchType);
    }
  };

  // const handleSearch = () => {
  //   if (searchType === "people") {
  //     navigate(`/people-search?q=${encodeURIComponent(searchTerm)}`);
  //   } else if (searchType === "company") {
  //     navigate(`/company-search?q=${encodeURIComponent(searchTerm)}`);
  //   }
  // };

  return (
    <div className="homepage">
      <Navbar /> {/* Add Navbar here */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find the Right <span className="highlight">People</span> and{" "}
            <span className="highlight">Companies</span>
          </h1>
          <p className="hero-subtitle">
            Access comprehensive information about individuals and businesses
            instantly
          </p>
          <p className="steps">
            <small>
              Select your option, Set your filter, Get updated results
            </small>
          </p>
          <div className="search-container">
            <div className="search-type-toggle">
              <button
                className={`toggle-btn ${
                  searchType === "company" ? "active" : ""
                }`}
                onClick={() => handleTypeChange("company")}
              >
                <FaBuilding /> Company
              </button>
              <button
                className={`toggle-btn ${
                  searchType === "jobs" ? "active" : ""
                }`}
                onClick={() => handleTypeChange("jobs")}
              >
                <FaBriefcase /> Company Jobs
              </button>
              <button
                className={`toggle-btn ${
                  searchType === "people" ? "active" : ""
                }`}
                onClick={() => handleTypeChange("people")}
              >
                <FaUser /> People
              </button>
            </div>

            {/* <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  searchType === "people"
                    ? "Search by name, location, or phone number..."
                    : "Search by company name, industry, or location..."
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button className="search-btn" onClick={handleSearch}>
                Search <FaArrowRight />
              </button>
            </div> */}
          </div>
          {searchType === "people" ? (
            <PeopleSearch />
          ) : searchType === "company" ? (
            <CompanySearch />
          ) : searchType == "jobs" ? (
            <JobSearch />
          ) : null}
        </div>
      </main>
      <section className="features">
        <div className="features-content">
          <h2>Why Choose Trillagy?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="icon">🎯</div>
              <h3>Accurate Results</h3>
              <p>
                Get precise and up-to-date information every time you search
              </p>
            </div>
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>Fast Search</h3>
              <p>Get instant results from our comprehensive database</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your searches are always confidential and secure</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
