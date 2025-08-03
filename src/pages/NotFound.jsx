import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home"></i>
              Go Home
            </Link>
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-search"></i>
              Browse Companies
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found {
          padding: 80px 0;
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .not-found-content {
          max-width: 600px;
        }

        .error-code {
          font-size: 8rem;
          font-weight: bold;
          color: #3498db;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .not-found h1 {
          font-size: 3rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .not-found p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .not-found-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .not-found-actions .btn {
          padding: 15px 30px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .error-code {
            font-size: 5rem;
          }

          .not-found h1 {
            font-size: 2rem;
          }

          .not-found-actions {
            flex-direction: column;
            align-items: center;
          }

          .not-found-actions .btn {
            width: 250px;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
