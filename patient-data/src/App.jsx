import { useState, useEffect } from 'react';
import { getPatients } from './services/api';
import Sidebar from './components/Sidebar';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';
import './App.css';

function App() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPatients()
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader" />
        <p>Loading patient data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p>Error: {error}</p>
        <p className="error-hint">Make sure the API is accessible and CORS is not blocked.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="top-bar-left">
          <span ><img src="/TechCare.svg" alt="Techcare logo" className="top-bar-title" /></span>
        </div>

        <nav className="top-bar-nav">
          <button className="top-nav-item">Overview</button>
          <button className="top-nav-item active">Patients</button>
          <button className="top-nav-item">Schedule</button>
          <button className="top-nav-item">Message</button>
          <button className="top-nav-item">Transactions</button>
        </nav>

        <div className="top-bar-right">
          <div className="doctor-info">
            <img
              src="/images/Dr-Jose.png"
              alt="Dr. Jose Simmons"
              className="doctor-avatar"
            />
            <div className="doctor-text">
              <span className="doctor-name">Dr. Jose Simmons</span>
              <span className="doctor-title">General Practitioner</span>
            </div>
          </div>
          <button className="settings-btn" title="Settings">
            <img src="/gear-setting.svg" alt="gear setting" />
          </button>
          <button className="more-btn" title="More">
            <img src="/vert-dot.svg" alt="vertical dot" />
          </button>
        </div>
      </header>

      <div className="main-layout">
        <Sidebar patient={patient} />
        <main className="main-content">
          <DiagnosisHistory history={patient?.diagnosis_history} />
          <DiagnosticList list={patient?.diagnostic_list} />
        </main>
        <aside className="right-panel">
          <PatientProfile patient={patient} />
          <LabResults results={patient?.lab_results} />
        </aside>
      </div>
    </div>
  );
}

export default App;
