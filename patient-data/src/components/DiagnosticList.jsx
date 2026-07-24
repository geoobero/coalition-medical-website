export default function DiagnosticList({ list }) {
  if (!list || list.length === 0) {
    return (
      <section className="diagnostic-list">
        <h2 className="section-title">Diagnostic List</h2>
        <p className="empty-state">No diagnostic data available.</p>
      </section>
    );
  }

  return (
    <section className="diagnostic-list">
      <h2 className="section-title">Diagnostic List</h2>
      <div className="diagnostic-table-wrapper">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <span className={`status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
