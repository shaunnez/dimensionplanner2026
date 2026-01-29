import './PageStyles.css';

export function MapPage() {
  return (
    <div className="page">
      <h1 className="page-title">Map</h1>

      <div className="map-image-container">
        <img
          src={import.meta.env.BASE_URL + 'map.PNG'}
          alt="Dimension Festival Map"
          className="map-image"
        />
      </div>

      <div className="map-legend">
        <h3 className="map-legend-title">Key Locations</h3>
        <div className="map-legend-items">
          <div className="map-legend-item">🎵 Astral Arena</div>
          <div className="map-legend-item">🌲 Nova Grove</div>
          <div className="map-legend-item">🧘 Cosmic Cove</div>
          <div className="map-legend-item">⛺ Teepee</div>
          <div className="map-legend-item">🔥 Fire & Flow</div>
          <div className="map-legend-item">🏕️ Camping Areas</div>
          <div className="map-legend-item">🚿 Showers</div>
          <div className="map-legend-item">🚻 Toilets</div>
          <div className="map-legend-item">💧 Water</div>
          <div className="map-legend-item">🍔 Food Vendors</div>
          <div className="map-legend-item">🍺 Bar</div>
          <div className="map-legend-item">🏥 Medical</div>
        </div>
      </div>
    </div>
  );
}
