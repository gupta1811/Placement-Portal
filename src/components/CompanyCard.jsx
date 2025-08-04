import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <div className="company-card card">
      <div className="company-header">
        <img clas src={company.logo} alt={`${company.name} logo`} className="company-logo" />
        <div className="company-info">
          <h3 className="company-name">{company.name}</h3>
          <p className="company-package">{company.package}</p>
        </div>
      </div>
      
      <div className="company-details">
        <p className="company-description">{company.description}</p>
        
        <div className="company-meta">
          <div className="meta-item">
            <i className="fas fa-calendar"></i>
            <span>Visit Date: {new Date(company.visitDate).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-graduation-cap"></i>
            <span>Eligibility: {company.eligibility}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-clock"></i>
            <span>Apply by: {new Date(company.applicationDeadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="positions">
          <h4>Available Positions:</h4>
          <div className="position-tags">
            {company.positions.map((position, index) => (
              <span key={index} className="position-tag">{position}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="company-actions">
        <Link to={`/company/${company.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>

      <style jsx>{`
        .company-card {
          border-left: 4px solid #3498db;
        }

        .company-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          margin-right: 15px;
          object-fit: cover;
        }

        .company-name {
          margin: 0 0 5px 0;
          color: #2c3e50;
          font-size: 1.4rem;
        }

        .company-package {
          margin: 0;
          color: #27ae60;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .company-description {
          color: #666;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .company-meta {
          margin-bottom: 15px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #555;
        }

        .meta-item i {
          width: 20px;
          margin-right: 10px;
          color: #3498db;
        }

        .positions h4 {
          margin-bottom: 10px;
          color: #2c3e50;
          font-size: 1rem;
        }

        .position-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .position-tag {
          background-color: #ecf0f1;
          color: #2c3e50;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          border: 1px solid #bdc3c7;
        }

        .company-actions {
          text-align: center;
        }

        @media (max-width: 768px) {
          .company-header {
            flex-direction: column;
            text-align: center;
          }

          .company-logo {
            margin-right: 0;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyCard;
