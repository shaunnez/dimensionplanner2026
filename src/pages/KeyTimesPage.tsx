import { festivalData, type Day, DAY_LABELS } from '../data/festivalData';
import './PageStyles.css';

export function KeyTimesPage() {
  return (
    <div className="page">
      <h1 className="page-title">Key Times</h1>

      <div className="key-times-section">
        <h2 className="section-title">
          <span>🎪</span>
          Festival
        </h2>
        {festivalData.key_times.festival.map((item, idx) => (
          <div key={idx} className="key-time-card">
            <span className="key-time-day">{DAY_LABELS[item.day as Day] || item.day}</span>
            <span className="key-time-time">{item.time}</span>
            <span className="key-time-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="key-times-section">
        <h2 className="section-title">
          <span>🚌</span>
          Transport
        </h2>
        {festivalData.key_times.transport.map((item, idx) => (
          <div key={idx} className="key-time-card">
            <span className="key-time-day">{DAY_LABELS[item.day as Day] || item.day}</span>
            <span className="key-time-time">{item.time}</span>
            <span className="key-time-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
