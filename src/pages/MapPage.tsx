import './PageStyles.css';

export function MapPage() {
  return (
    <div className="page">
      <h1 className="page-title">Map</h1>

      <div className="map-container">
        <div className="map-placeholder">
          <span className="map-icon">🗺️</span>
          <p className="map-text">Festival map coming soon</p>
        </div>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
          The interactive festival map will be available here.
        </p>
      </div>
    </div>
  );
}
