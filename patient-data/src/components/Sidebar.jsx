export default function Sidebar({ patient }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">
        <p>
          Patients
        </p>
        <img src="/search.svg" alt="search icon" className="search-icon" />
      </div>

      <div className="sidebar-patient-list">
        <div className="patient-list-item active">
          <img
            src={patient?.profile_picture || 'https://fedskillstest.ct.digital/4.png'}
            alt={patient?.name || 'Jessica Taylor'}
            className="patient-list-avatar"
          />
          <div className="patient-div">
            <div className="patient-list-info">
              <span className="patient-list-name">{patient?.name || 'Jessica Taylor'}</span>
              <span className="patient-list-detail">{patient?.gender || 'Female'}, {patient?.age || 28}</span>
            </div>
            <img src="/horiz-dot.svg" alt="horizontal dot" className="horiz-dot" />
          </div>
        </div>
      </div>
    </aside>
  );
}
