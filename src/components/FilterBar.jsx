import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange, companies }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    packageRange: '',
    branch: '',
    sortBy: 'visitDate'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Extract unique branches from companies
  const branches = [...new Set(
    companies.flatMap(company => company.requirements.branches)
  )];

  return (
    <div className="filter-bar">
      <div className="container">
        <div className="filter-grid">
          {/* Search Input */}
          <div className="filter-item">
            <label htmlFor="search">Search Companies</label>
            <div className="search-input">
              <i className="fas fa-search"></i>
              <input
                type="text"
                id="search"
                placeholder="Search by company name..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>
          </div>

          {/* Package Filter */}
          <div className="filter-item">
            <label htmlFor="package">Package Range</label>
            <select
              id="package"
              value={filters.packageRange}
              onChange={(e) => handleFilterChange('packageRange', e.target.value)}
            >
              <option value="">All Packages</option>
              <option value="0-10">0-10 LPA</option>
              <option value="10-20">10-20 LPA</option>
              <option value="20-50">20-50 LPA</option>
              <option value="50+">50+ LPA</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div className="filter-item">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-item">
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="visitDate">Visit Date</option>
              <option value="applicationDeadline">Application Deadline</option>
              <option value="name">Company Name</option>
              <option value="package">Package</option>
            </select>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-bar {
          background-color: white;
          padding: 20px 0;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          align-items: end;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
        }

        .filter-item label {
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
        }

        .search-input {
          position: relative;
        }

        .search-input i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .search-input input {
          width: 100%;
          padding: 10px 10px 10px 40px;
          border: 2px solid #e1e8ed;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .search-input input:focus {
          outline: none;
          border-color: #3498db;
        }

        select {
          padding: 10px;
          border: 2px solid #e1e8ed;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
          cursor: pointer;
          transition: border-color 0.3s;
        }

        select:focus {
          outline: none;
          border-color: #3498db;
        }

        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
