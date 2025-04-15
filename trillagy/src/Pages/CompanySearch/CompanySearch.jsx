// src/Pages/PeopleSearch/PeopleSearch.jsx
import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";

const CompanySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    titles: [],
    departments: [],
    industries: [],
    companySize: [],
    emailVerified: false,
  });

  // Filter options
  const filterOptions = {
    titles: [
      "CEO",
      "CTO",
      "CFO",
      "VP",
      "Director",
      "Manager",
      "HR",
      "Recruitment",
    ],
    departments: ["Engineering", "Sales", "Marketing", "Finance"],
    industries: ["Technology", "Healthcare", "Finance", "Retail"],
    companySize: ["1-10", "11-50", "51-200", "201-500", "500+"],
  };

  const searchPeople = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3001/api/search-people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_keywords: searchTerm ? [searchTerm] : [],
          person_titles: filters.titles,
          person_departments: filters.departments,
          organization_industries: filters.industries,
          organization_employee_counts: filters.companySize,
          verified_email: filters.emailVerified,
          page: 1,
          show_cse: true,
          show_starter_email: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.people || []);
    } catch (err) {
      setError(err.message);
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].includes(value)
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value]
        : value,
    }));
  };

  return (
    <div className="people-search-page">
      <div className="search-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, title, or company..."
            onKeyPress={(e) => e.key === "Enter" && searchPeople()}
          />
          <button
            className={`filter-btn ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>
        <button
          className="search-btn"
          onClick={searchPeople}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-content">
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="filter-section">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="filter-options">
                  {options.map((option) => (
                    <label key={option} className="filter-option">
                      <input
                        type="checkbox"
                        checked={filters[category].includes(option)}
                        onChange={() => handleFilterChange(category, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="filter-section">
              <h3>Email Verification</h3>
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.emailVerified}
                  onChange={() =>
                    handleFilterChange("emailVerified", !filters.emailVerified)
                  }
                />
                Verified emails only
              </label>
            </div>
          </div>
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}

      <div className="results-section">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="results-header">
              <h3>Search Results ({results.length})</h3>
              <button className="export-btn">
                <FaDownload /> Export
              </button>
            </div>
            <div className="table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>LinkedIn</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((person, index) => (
                    <tr key={index}>
                      <td>{person.name}</td>
                      <td>{person.title}</td>
                      <td>{person.organization?.name}</td>
                      <td>{person.email || "N/A"}</td>
                      <td>{person.location || "N/A"}</td>
                      <td>
                        {person.linkedin_url ? (
                          <a
                            href={person.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Profile
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanySearch;
