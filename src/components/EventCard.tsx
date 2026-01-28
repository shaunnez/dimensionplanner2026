import { useSelection } from '../context/SelectionContext';
import './EventCard.css';

interface EventCardProps {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location?: string;
  onClick: () => void;
}

export function EventCard({ id, name, startTime, endTime, location, onClick }: EventCardProps) {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSelection(id);
  };

  return (
    <div className={`event-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="event-time">
        <span className="start-time">{startTime}</span>
        <span className="time-separator">-</span>
        <span className="end-time">{endTime}</span>
      </div>
      <div className="event-info">
        <h3 className="event-name">{name}</h3>
        {location && <p className="event-location">{location}</p>}
      </div>
      <button
        className={`event-toggle ${selected ? 'selected' : ''}`}
        onClick={handleToggle}
        aria-label={selected ? 'Remove from schedule' : 'Add to schedule'}
      >
        {selected ? '✓' : '+'}
      </button>
    </div>
  );
}
