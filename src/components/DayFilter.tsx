import { type Day, DAY_LABELS } from '../data/festivalData';
import './DayFilter.css';

interface DayFilterProps {
  days: Day[];
  selectedDay: Day | 'all';
  onDayChange: (day: Day | 'all') => void;
}

export function DayFilter({ days, selectedDay, onDayChange }: DayFilterProps) {
  return (
    <div className="day-filter">
      <button
        className={`day-btn ${selectedDay === 'all' ? 'active' : ''}`}
        onClick={() => onDayChange('all')}
      >
        All
      </button>
      {days.map((day) => (
        <button
          key={day}
          className={`day-btn ${selectedDay === day ? 'active' : ''}`}
          onClick={() => onDayChange(day)}
        >
          {DAY_LABELS[day]}
        </button>
      ))}
    </div>
  );
}
