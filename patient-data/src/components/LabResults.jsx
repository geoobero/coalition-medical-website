export default function LabResults({ results }) {
  if (!results || results.length === 0) {
    return (
      <section className="lab-results">
        <h2 className="section-title">Lab Results</h2>
        <p className="empty-state">No lab results available.</p>
      </section>
    );
  }

  return (
    <section className="lab-results">
      <h2 className="section-title">Lab Results</h2>
      <div className="lab-list">
        {results.map((result, index) => (
          <div className="lab-item" key={index}>
            <span className="lab-name">{result}</span>
            <button className="download-btn" title="Download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
