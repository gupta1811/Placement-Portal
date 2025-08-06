import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companies } from '../data/dummyData';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const foundCompany = companies.find(c => c.id === parseInt(id));
    setCompany(foundCompany);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading company details...</div>;
  }

  if (!company) {
    return (
      <div className="not-found">
        <h2>Company not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="company-details">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Companies
        </button>

        <div className="company-header">
          <img  src={company.logo} alt={`${company.name} logo`} className="company-logo" />
          <div className="company-info">
            <h1>{company.name}</h1>
            <p className="package">{company.package}</p>
            <p className="description">{company.description}</p>
          </div>
        </div>

        <div className="details-grid">
          {/* Basic Information */}
          <div className="detail-section">
            <h2>Basic Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Visit Date:</strong>
                <span>{new Date(company.visitDate).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <strong>Application Deadline:</strong>
                <span>{new Date(company.applicationDeadline).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <strong>Package:</strong>
                <span>{company.package}</span>
              </div>
              <div className="info-item">
                <strong>Eligibility:</strong>
                <span>{company.eligibility}</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="detail-section">
            <h2>Requirements</h2>
            <div className="requirements">
              <div className="requirement-item">
                <strong>Minimum CGPA:</strong>
                <span>{company.requirements.cgpa}</span>
              </div>
              <div className="requirement-item">
                <strong>Eligible Branches:</strong>
                <div className="branches">
                  {company.requirements.branches.map((branch, index) => (
                    <span key={index} className="branch-tag">{branch}</span>
                  ))}
                </div>
              </div>
              <div className="requirement-item">
                <strong>Required Skills:</strong>
                <div className="skills">
                  {company.requirements.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Available Positions */}
          <div className="detail-section">
            <h2>Available Positions</h2>
            <div className="positions">
              {company.positions.map((position, index) => (
                <div key={index} className="position-item">
                  <i className="fas fa-briefcase"></i>
                  <span>{position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Process */}
          <div className="detail-section">
            <h2>Selection Process</h2>
            <div className="selection-process">
              {company.selectionProcess.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="btn btn-primary btn-large">
            <i className="fas fa-paper-plane"></i>
            Apply Now
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-bookmark"></i>
            Save for Later
          </button>
        </div>
      </div>

      <style jsx>{`
        .company-details {
          padding: 40px 0;
          min-height: calc(100vh - 200px);
        }

        .back-button {
          background: none;
          border: none;
          color: #3498db;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .back-button:hover {
          color: #2980b9;
        }

        .company-header {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .company-logo {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          margin-right: 30px;
          object-fit: cover;
        }

        .company-info h1 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 2.5rem;
        }

        .package {
          color: #27ae60;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .description {
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .detail-section {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .detail-section h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.5rem;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }

        .info-grid {
          display: grid;
          gap: 15px;
        }

        .info-item, .requirement-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #ecf0f1;
        }

        .info-item:last-child, .requirement-item:last-child {
          border-bottom: none;
        }

        .branches, .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .branch-tag, .skill-tag {
          background-color: #3498db;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .skill-tag {
          background-color: #e74c3c;
        }

        .positions {
          display: grid;
          gap: 10px;
        }

        .position-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .position-item i {
          color: #3498db;
        }

        .selection-process {
          display: grid;
          gap: 15px;
        }

        .process-step {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background-color: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .step-content {
          flex: 1;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }

        .action-section {
          text-align: center;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .btn-large {
          padding: 15px 40px;
          font-size: 1.1rem;
          margin-right: 20px;
        }

        .loading, .not-found {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        @media (max-width: 768px) {
          .company-header {
            flex-direction: column;
            text-align: center;
          }

          .company-logo {
            margin-right: 0;
            margin-bottom: 20px;
          }

          .company-info h1 {
            font-size: 2rem;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .info-item, .requirement-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .btn-large {
            margin-right: 0;
            margin-bottom: 15px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyDetails;
