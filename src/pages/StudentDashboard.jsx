import React, { useState } from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  /* ──────────  ❶  Personal data (state)  ────────── */
  const [student, setStudent] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    branch: 'Computer Science Engineering',
    rollNo: 'CSE21001',
    profileImage: null
  });

  /* edit mode flag */
  const [editing, setEditing] = useState(false);

  /* temp form state used only while editing */
  const [draft, setDraft] = useState(student);

  const startEditing = () => {
    setDraft(student);      // copy current data into draft
    setEditing(true);
  };

  const cancelEditing = () => setEditing(false);

  const saveChanges = () => {
    setStudent(draft);
    setEditing(false);
  };

  const onDraftChange = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  /* ────────── ❷ Image Upload Handler ────────── */
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setStudent((prev) => ({ ...prev, profileImage: null }));
  };

  /* ──────────  ❸  Company data  (mock)  ────────── */
  const companies = [
    {
      id: 1,
      name: 'Google India',
      pptDate: '2025-08-15',
      pptTime: '10:00 AM',
      testDate: '2025-08-20',
      testTime: '2:00 PM',
      package: '₹25-30 LPA',
      location: 'Bangalore',
      jobDescription:
        'Software Engineer role focusing on full-stack development, cloud technologies and machine-learning applications. Looking for candidates with strong problem-solving skills and experience in modern web technologies.'
    },
    {
      id: 2,
      name: 'Microsoft Corporation',
      pptDate: '2025-08-18',
      pptTime: '11:30 AM',
      testDate: '2025-08-25',
      testTime: '9:00 AM',
      package: '₹20-25 LPA',
      location: 'Hyderabad',
      jobDescription:
        'Software Development Engineer working on Azure cloud services and enterprise applications. Requires proficiency in C#, .NET and cloud-computing platforms.'
    },
    {
      id: 3,
      name: 'Amazon Web Services',
      pptDate: '2025-08-22',
      pptTime: '2:30 PM',
      testDate: '2025-08-28',
      testTime: '1:00 PM',
      package: '₹22-28 LPA',
      location: 'Mumbai',
      jobDescription:
        'Cloud Solutions Engineer involving AWS infrastructure, DevOps practices and scalable-system design. Experience with containerisation and micro-services architecture preferred.'
    }
  ];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  /* ──────────  ❹  Detail-row state (unchanged) ────────── */
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = (c) => {
    if (selectedCompany && selectedCompany.id === c.id) {
      setSelectedCompany(null);
      setShowDesc(false);
    } else {
      setSelectedCompany(c);
      setShowDesc(false);
    }
  };

  const toggleDescription = () => setShowDesc((p) => !p);

  /* ──────────  ❺  JSX  ────────── */
  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        {/* ── Header ── */}
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Edit your profile and explore companies</p>
        </header>

        {/* ── Personal details ── */}
        <section className="personal-details-section">
          <div className="personal-details-card">
            {/* left column – photo */}
            <div className="profile-image-container">
              {student.profileImage ? (
                <div className="profile-image-wrapper">
                  <img
                    src={student.profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={removeImage}
                    title="Remove image"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="profile-placeholder">
                  <i className="fas fa-user" />
                </div>
              )}

              {/* Upload button */}
              <label htmlFor="upload-photo" className="upload-photo-btn">
                <i className="fas fa-camera" />
                {student.profileImage ? 'Change Photo' : 'Upload Photo'}
              </label>
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={onImageChange}
              />
            </div>

            {/* right column – fields */}
            <div className="personal-info">
              {/* Name + Roll */}
              <div className="info-row">
                <div className="info-item">
                  <label>Full Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={draft.name}
                      onChange={(e) => onDraftChange('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                  ) : (
                    <span>{student.name}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Roll Number</label>
                  {editing ? (
                    <input
                      type="text"
                      value={draft.rollNo}
                      onChange={(e) => onDraftChange('rollNo', e.target.value)}
                      placeholder="Enter roll number"
                    />
                  ) : (
                    <span>{student.rollNo}</span>
                  )}
                </div>
              </div>

              {/* Email + Phone */}
              <div className="info-row">
                <div className="info-item">
                  <label>Email Address</label>
                  {editing ? (
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => onDraftChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  ) : (
                    <span>{student.email}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>Phone Number</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={draft.phone}
                      onChange={(e) => onDraftChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <span>{student.phone}</span>
                  )}
                </div>
              </div>

              {/* Branch */}
              <div className="info-row">
                <div className="info-item full-width">
                  <label>Branch</label>
                  {editing ? (
                    <input
                      type="text"
                      value={draft.branch}
                      onChange={(e) => onDraftChange('branch', e.target.value)}
                      placeholder="Enter branch"
                    />
                  ) : (
                    <span>{student.branch}</span>
                  )}
                </div>
              </div>

              {/* action buttons */}
              <div className="edit-profile-btn-container">
                {editing ? (
                  <>
                    <button
                      className="edit-profile-btn save-btn"
                      onClick={saveChanges}
                    >
                      <i className="fas fa-save" />
                      Save Changes
                    </button>
                    <button
                      className="edit-profile-btn cancel-btn"
                      onClick={cancelEditing}
                    >
                      <i className="fas fa-times" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="edit-profile-btn"
                    onClick={startEditing}
                  >
                    <i className="fas fa-edit" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Companies Table ── */}
        <section className="companies-section">
          <div className="section-header">
            <h2>Available Companies</h2>
            <p>Click a row to view details</p>
          </div>

          <div className="companies-table-container">
            <table className="companies-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>PPT Date</th>
                  <th>Test Date</th>
                  <th>Package</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {companies.map((c) => (
                  <React.Fragment key={c.id}>
                    <tr
                      className={`company-row ${
                        selectedCompany?.id === c.id ? 'active' : ''
                      }`}
                      onClick={() => handleRowClick(c)}
                    >
                      <td>
                        <div className="company-info">
                          <div className="company-logo-small">
                            <i className="fas fa-building" />
                          </div>
                          <span className="company-name">{c.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <strong>{formatDate(c.pptDate)}</strong>
                          <span>{c.pptTime}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <strong>{formatDate(c.testDate)}</strong>
                          <span>{c.testTime}</span>
                        </div>
                      </td>
                      <td className="package-cell">{c.package}</td>
                      <td className="location-cell">
                        <i className="fas fa-map-marker-alt" />
                        {c.location}
                      </td>
                    </tr>

                    {selectedCompany?.id === c.id && (
                      <tr className="detail-row">
                        <td colSpan={5}>
                          <div className="detail-content">
                            <div className="detail-header">
                              <h3
                                className="detail-company-name"
                                onClick={toggleDescription}
                              >
                                ✨ {selectedCompany.name}
                                <i
                                  className={`fas fa-chevron-down toggle-icon ${
                                    showDesc ? 'open' : ''
                                  }`}
                                />
                              </h3>

                              <button
                                className="close-detail"
                                onClick={() => setSelectedCompany(null)}
                              >
                                ×
                              </button>
                            </div>

                            <div className="detail-quick-info">
                              <div className="detail-chip package">
                                <i className="fas fa-gem" />
                                <span>{selectedCompany.package}</span>
                              </div>
                              <div className="detail-chip location">
                                <i className="fas fa-map-marker-alt" />
                                <span>{selectedCompany.location}</span>
                              </div>
                            </div>

                            <div className="detail-schedule">
                              <div className="schedule-card">
                                <h4>
                                  <i className="fas fa-presentation" />
                                  PPT Schedule
                                </h4>
                                <div className="date">
                                  {formatDate(selectedCompany.pptDate)}
                                </div>
                                <div className="time">
                                  {selectedCompany.pptTime}
                                </div>
                              </div>

                              <div className="schedule-card">
                                <h4>
                                  <i className="fas fa-clipboard-list" />
                                  Test Schedule
                                </h4>
                                <div className="date">
                                  {formatDate(selectedCompany.testDate)}
                                </div>
                                <div className="time">
                                  {selectedCompany.testTime}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`detail-description ${
                                showDesc ? 'show' : ''
                              }`}
                            >
                              <h4>
                                <i className="fas fa-info-circle" />
                                Job Description
                              </h4>
                              <p>{selectedCompany.jobDescription}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
