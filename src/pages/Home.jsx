import React, { useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import FilterBar from '../components/FilterBar';
import { companies as dummyCompanies, announcements } from '../data/dummyData';
import { motion } from 'framer-motion';

const Home = () => {
  const [companies] = useState(dummyCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(dummyCompanies);
  const [loading] = useState(false);

  // Simple filter logic example — expand as needed
  const handleFilterChange = (filters) => {
    let filtered = [...companies];
    if (filters.searchTerm) {
      filtered = filtered.filter(
        company =>
          company.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          company.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    setFilteredCompanies(filtered);
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-gradient">
        <div className="hero-container">
          <h1 className="animated-main-title">Welcome to Placement Portal</h1>
          <div className="accent-bar"></div>
          <div className="hero-lead">
            <span>
              <i className="fas fa-bullseye"></i>
              Discover <span className="highlight">exciting career opportunities</span> with
              <span className="highlight"> top companies </span>
              visiting our campus
            </span>
          </div>
          <motion.div
            className="hero-statsbox"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.75, ease: 'easeOut' }}
          >
            <div className="stat-float">
              <span className="float-number">{companies.length}</span>
              <span className="float-label">Companies</span>
            </div>
            <div className="stat-float">
              <span className="float-number">
                {companies.reduce((acc, c) => acc + c.positions.length, 0)}
              </span>
              <span className="float-label">Positions</span>
            </div>
            <div className="stat-float">
              <span className="float-number">85%</span>
              <span className="float-label">Placement Rate</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <motion.section
        className="announcements"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>Latest Announcements</h2>
          <div className="announcements-grid">
            {announcements.map(announcement => (
              <motion.div
                key={announcement.id}
                className="announcement-card card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.44, delay: 0.14 * announcement.id }}
              >
                <div className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString()}
                </div>
                <h3>{announcement.title}</h3>
                <p>{announcement.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Companies Section */}
      <motion.section
        className="companies-section"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.68, delay: 0.36, ease: "easeOut" }}
      >
        <div className="container">
          <h2>Upcoming Companies</h2>
          <FilterBar onFilterChange={handleFilterChange} companies={companies} />
          {loading ? (
            <div className="loading">Loading companies...</div>
          ) : (
            <>
              <div className="companies-count">
                Showing {filteredCompanies.length} of {companies.length} companies
              </div>
              <div className="companies-grid grid grid-2">
                {filteredCompanies.map(company => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.08 * company.id }}
                  >
                    <CompanyCard company={company} />
                  </motion.div>
                ))}
              </div>
              {filteredCompanies.length === 0 && (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  <h3>No companies found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              )}
            </>
          )}
        </div>
      </motion.section>

    </div>
  );
};

export default Home;
