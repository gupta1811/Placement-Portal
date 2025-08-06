import React, { useState } from 'react';
import { companies as initialCompanies, announcements as initialAnnouncements } from '../data/dummyData';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [companies, setCompanies] = useState(initialCompanies);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showAddForm, setShowAddForm] = useState(false);

  // Company form state
  const [companyForm, setCompanyForm] = useState({
    name: '',
    description: '',
    package: '',
    eligibility: '',
    visitDate: '',
    applicationDeadline: '',
    positions: [''],
    requirements: {
      cgpa: '',
      branches: [''],
      skills: ['']
    },
    selectionProcess: ['']
  });

  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleCompanyFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCompanyForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCompanyForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setCompanyForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleNestedArrayFieldChange = (parent, field, index, value) => {
    setCompanyForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: prev[parent][field].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const addArrayField = (field) => {
    setCompanyForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const addNestedArrayField = (parent, field) => {
    setCompanyForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: [...prev[parent][field], '']
      }
    }));
  };

  const removeArrayField = (field, index) => {
    setCompanyForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const removeNestedArrayField = (parent, field, index) => {
    setCompanyForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: prev[parent][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    const newCompany = {
      ...companyForm,
      id: companies.length + 1,
      logo: "https://via.placeholder.com/100x100?text=" + companyForm.name.charAt(0),
      requirements: {
        ...companyForm.requirements,
        cgpa: parseFloat(companyForm.requirements.cgpa)
      }
    };
    setCompanies([...companies, newCompany]);
    setCompanyForm({
      name: '',
      description: '',
      package: '',
      eligibility: '',
      visitDate: '',
      applicationDeadline: '',
      positions: [''],
      requirements: {
        cgpa: '',
        branches: [''],
        skills: ['']
      },
      selectionProcess: ['']
    });
    setShowAddForm(false);
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      ...announcementForm,
      id: announcements.length + 1
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setAnnouncementForm({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            Companies ({companies.length})
          </button>
          <button 
            className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements ({announcements.length})
          </button>
        </div>

        {activeTab === 'companies' && (
          <div className="companies-section">
            <div className="section-header">
              <h2>Manage Companies</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <i className="fas fa-plus"></i>
                {showAddForm ? 'Cancel' : 'Add Company'}
              </button>
            </div>

            {showAddForm && (
              <form className="add-form card" onSubmit={handleAddCompany}>
                <h3>Add New Company</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => handleCompanyFormChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Package *</label>
                    <input
                      type="text"
                      value={companyForm.package}
                      onChange={(e) => handleCompanyFormChange('package', e.target.value)}
                      placeholder="e.g., ₹12-15 LPA"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Visit Date *</label>
                    <input
                      type="date"
                      value={companyForm.visitDate}
                      onChange={(e) => handleCompanyFormChange('visitDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Application Deadline *</label>
                    <input
                      type="date"
                      value={companyForm.applicationDeadline}
                      onChange={(e) => handleCompanyFormChange('applicationDeadline', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={companyForm.description}
                    onChange={(e) => handleCompanyFormChange('description', e.target.value)}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Eligibility *</label>
                  <input
                    type="text"
                    value={companyForm.eligibility}
                    onChange={(e) => handleCompanyFormChange('eligibility', e.target.value)}
                    placeholder="e.g., B.Tech/M.Tech - CSE, IT, ECE"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Minimum CGPA *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={companyForm.requirements.cgpa}
                    onChange={(e) => handleCompanyFormChange('requirements.cgpa', e.target.value)}
                    required
                  />
                </div>

                {/* Dynamic Arrays */}
                <div className="form-group">
                  <label>Available Positions</label>
                  {companyForm.positions.map((position, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={position}
                        onChange={(e) => handleArrayFieldChange('positions', index, e.target.value)}
                        placeholder="Position title"
                      />
                      {companyForm.positions.length > 1 && (
                        <button type="button" onClick={() => removeArrayField('positions', index)}>
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayField('positions')}>
                    Add Position
                  </button>
                </div>

                <div className="form-group">
                  <label>Eligible Branches</label>
                  {companyForm.requirements.branches.map((branch, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => handleNestedArrayFieldChange('requirements', 'branches', index, e.target.value)}
                        placeholder="Branch code (e.g., CSE)"
                      />
                      {companyForm.requirements.branches.length > 1 && (
                        <button type="button" onClick={() => removeNestedArrayField('requirements', 'branches', index)}>
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedArrayField('requirements', 'branches')}>
                    Add Branch
                  </button>
                </div>

                <div className="form-group">
                  <label>Required Skills</label>
                  {companyForm.requirements.skills.map((skill, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleNestedArrayFieldChange('requirements', 'skills', index, e.target.value)}
                        placeholder="Skill name"
                      />
                      {companyForm.requirements.skills.length > 1 && (
                        <button type="button" onClick={() => removeNestedArrayField('requirements', 'skills', index)}>
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedArrayField('requirements', 'skills')}>
                    Add Skill
                  </button>
                </div>

                <div className="form-group">
                  <label>Selection Process</label>
                  {companyForm.selectionProcess.map((step, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleArrayFieldChange('selectionProcess', index, e.target.value)}
                        placeholder="Selection step"
                      />
                      {companyForm.selectionProcess.length > 1 && (
                        <button type="button" onClick={() => removeArrayField('selectionProcess', index)}>
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayField('selectionProcess')}>
                    Add Step
                  </button>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Company</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="companies-list">
              {companies.map(company => (
                <div key={company.id} className="company-item card">
                  <div className="company-info">
                    <h3>{company.name}</h3>
                    <p>{company.package}</p>
                    <p>Visit Date: {new Date(company.visitDate).toLocaleDateString()}</p>
                  </div>
                  <div className="company-actions">
                    <button className="btn btn-secondary btn-sm">Edit</button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCompany(company.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="announcements-section">
            <div className="section-header">
              <h2>Manage Announcements</h2>
            </div>

            <form className="add-form card" onSubmit={handleAddAnnouncement}>
              <h3>Add New Announcement</h3>
              
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content *</label>
                <textarea
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={announcementForm.date}
                  onChange={(e) => setAnnouncementForm({...announcementForm, date: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Add Announcement</button>
            </form>

            <div className="announcements-list">
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item card">
                  <div className="announcement-info">
                    <h3>{announcement.title}</h3>
                    <p>{announcement.content}</p>
                    <small>{new Date(announcement.date).toLocaleDateString()}</small>
                  </div>
                  <div className="announcement-actions">
                    <button className="btn btn-secondary btn-sm">Edit</button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-panel {
          padding: 40px 0;
          min-height: calc(100vh - 200px);
        }

        .admin-panel h1 {
          text-align: center;
          margin-bottom: 40px;
          color: #2c3e50;
        }

        .admin-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #ecf0f1;
        }

        .tab {
          padding: 15px 30px;
          background: none;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          color: #666;
          border-bottom: 3px solid transparent;
          transition: all 0.3s;
        }

        .tab.active {
          color: #3498db;
          border-bottom-color: #3498db;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }



        // .add-form {
        //   margin-bottom: 30px;
        //   border: 2px solid #3498db;
        // }



        .add-form {
          margin-bottom: 30px;
          border: 2px solid #3498db;
          background-color: #ffffff; /* white background */
          color: #2c3e50; /* dark blue-gray text */
        }


        .add-form h3 {
          color: #2c3e50; /* heading ka color */
        }

        .add-form label {
          color: #2c3e50; /* label ka color */
        }

        .add-form input,
        .add-form textarea,
        .add-form select {
          background-color: #ffffff;
          color: #2c3e50;
          border: 1px solid #ccc;
        }

        .add-form input:focus,
        .add-form textarea:focus {
          border-color: #3498db;
        }


        .add-form h3 {
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 2px solid #e1e8ed;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
        }

        .array-input {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .array-input input {
          flex: 1;
          margin-bottom: 0;
        }

        .array-input button {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.9rem;
        }

        .btn-danger {
          background-color: #e74c3c;
          color: white;
        }

        .btn-danger:hover {
          background-color: #c0392b;
        }

        .companies-list,
        .announcements-list {
          display: grid;
          gap: 20px;
        }

        .company-item,
        .announcement-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 4px solid #3498db;
        }

        .company-info h3,
        .announcement-info h3 {
          margin-bottom: 5px;
          color: #2c3e50;
        }

        .company-actions,
        .announcement-actions {
          display: flex;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .admin-tabs {
            flex-direction: column;
          }

          .section-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .company-item,
          .announcement-item {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .company-actions,
          .announcement-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
