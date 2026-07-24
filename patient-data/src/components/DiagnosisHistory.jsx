import { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function DiagnosisHistory({ history }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!history || history.length === 0) return;

    const labels = history.map((h) => `${h.month.substring(0, 3)}, ${h.year}`);
    const systolicData = history.map((h) => h.blood_pressure.systolic.value);
    const diastolicData = history.map((h) => h.blood_pressure.diastolic.value);

    const ctx = canvasRef.current.getContext('2d');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Systolic',
            data: systolicData,
            borderColor: '#FF6200',
            backgroundColor: 'rgba(255, 98, 0, 0.1)',
            pointBackgroundColor: '#FF6200',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            tension: 0.3,
            fill: false,
          },
          {
            label: 'Diastolic',
            data: diastolicData,
            borderColor: '#705AAA',
            backgroundColor: 'rgba(112, 90, 170, 0.1)',
            pointBackgroundColor: '#705AAA',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#707070', font: { size: 12, family: 'Manrope' } },
          },
          y: {
            min: 60,
            max: 180,
            grid: { color: '#EDEDED' },
            ticks: { stepSize: 20, color: '#707070', font: { size: 12, family: 'Manrope' } },
          },
        },
      },
    });
  }, [history]);

  if (!history || history.length === 0) {
    return <div className="diagnosis-history">Loading diagnosis history...</div>;
  }

  const latest = history[history.length - 1];
  const systolic = latest.blood_pressure.systolic;
  const diastolic = latest.blood_pressure.diastolic;

  return (
    <section className="diagnosis-history">
      <h2 className="section-title">Diagnosis History</h2>

      <div className="bp-chart-card">
        <div className="bp-chart-header">
          <h3>Blood Pressure</h3>
          <span className="bp-date-range">Last 6 months</span>
        </div>
        <div className="bp-chart-container">
          <div className="bp-chart-legend">
            <div className="legend-item">
              <span className="legend-dot systolic-dot" />
              <span className="legend-label">Systolic</span>
              <span className="legend-value">{systolic.value}</span>
              <span className="legend-level">{systolic.levels}</span>
            </div>
            <div className="legend-divider" />
            <div className="legend-item">
              <span className="legend-dot diastolic-dot" />
              <span className="legend-label">Diastolic</span>
              <span className="legend-value">{diastolic.value}</span>
              <span className="legend-level">{diastolic.levels}</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

      <div className="vitals-grid">
        <div className="vital-card respiratory">
          <img src="/respiratory-rate.svg" alt="respiratory icon" className='respiratory-icon' />
          <span className="vital-label">Respiratory Rate</span>
          <span className="vital-value">{latest.respiratory_rate.value} bpm</span>
          <span className="vital-status">{latest.respiratory_rate.levels}</span>
        </div>
        <div className="vital-card temperature">
           <img src="/temperature.svg" alt="temperature icon" className='temperature-icon' />
          <span className="vital-label">Temperature</span>
          <span className="vital-value">{latest.temperature.value}°F</span>
          <span className="vital-status">{latest.temperature.levels}</span>
        </div>
        <div className="vital-card heart-rate">
          <img src="/HeartBPM-icon.svg" alt="heartbpm icon" className='heartbpm-icon' />
          <span className="vital-label">Heart Rate</span>
          <span className="vital-value">{latest.heart_rate.value} bpm</span>
          <span className="vital-status">{latest.heart_rate.levels}</span>
        </div>
      </div>
    </section>
  );
}
