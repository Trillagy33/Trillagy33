// src/Pages/PeopleSearch/PeopleSearch.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const OrgJobSearch = () => {
  const [orgId, setOrgId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/org-jobs/${orgId}');
      if (!response.ok) throw new Error('Status ${response.status}');
      const data = await response.json();
      setJobs(data.job_postings || []);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };
return (
    <div>
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Enter Organization ID"
          value={orgId}
          onChange={e => setOrgId(e.target.value)}
          onKeyDown={e => e.key === "Enter" && searchJobs()}
        />
        <button onClick={searchJobs} disabled={loading}>Search Jobs</button>
      </div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : jobs.length > 0 ? (
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Posted At</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      View Job
                    </a>
                  </td>
                  <td>{job.city  || "N/A"}</td>
                  <td>{job.state || "N/A"}</td>
                  <td>{job.country || "N/A"}</td>
                  <td>{job.posted_at ? new Date(job.posted_at).toLocaleString() : "N/A"}</td>
                  <td>{job.last_seen_at ? new Date(job.last_seen_at).toLocaleString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No jobs found.</div>
        )}
      </div>
    </div>
  );
};

export default OrgJobSearch;
      