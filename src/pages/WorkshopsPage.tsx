import { useState, useMemo } from 'react';
import { festivalData, type Day, DAY_ORDER, DAY_LABELS } from '../data/festivalData';
import { EventCard } from '../components/EventCard';
import { DayFilter } from '../components/DayFilter';
import { Modal, generateEventId } from '../components/Modal';
import './PageStyles.css';

interface SelectedEvent {
  name: string;
  day: string;
  startTime: string;
  endTime: string;
  lengthMinutes: number;
  location: string;
}

export function WorkshopsPage() {
  const [selectedDay, setSelectedDay] = useState<Day | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [modalEvent, setModalEvent] = useState<SelectedEvent | null>(null);

  const locations = useMemo(() =>
    festivalData.workshops.map(loc => loc.location),
    []
  );

  const availableDays = useMemo(() => {
    const days = new Set<Day>();
    festivalData.workshops.forEach(loc => {
      loc.events.forEach(event => {
        if (DAY_ORDER.includes(event.day as Day)) {
          days.add(event.day as Day);
        }
      });
    });
    return DAY_ORDER.filter(day => days.has(day));
  }, []);

  const filteredEvents = useMemo(() => {
    const events: Array<{
      name: string;
      day: Day;
      startTime: string;
      endTime: string;
      lengthMinutes: number;
      location: string;
    }> = [];

    festivalData.workshops.forEach(loc => {
      if (selectedLocation !== 'all' && loc.location !== selectedLocation) return;

      loc.events.forEach(event => {
        if (selectedDay !== 'all' && event.day !== selectedDay) return;
        events.push({
          ...event,
          day: event.day as Day,
          location: loc.location
        });
      });
    });

    return events.sort((a, b) => {
      const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [selectedDay, selectedLocation]);

  const groupedByDay = useMemo(() => {
    const groups: Record<string, typeof filteredEvents> = {};
    filteredEvents.forEach(event => {
      if (!groups[event.day]) groups[event.day] = [];
      groups[event.day].push(event);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <div className="page">
      <h1 className="page-title">Workshops</h1>

      <div className="location-filter">
        <button
          className={`location-btn ${selectedLocation === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedLocation('all')}
        >
          All Locations
        </button>
        {locations.map(location => (
          <button
            key={location}
            className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
            onClick={() => setSelectedLocation(location)}
          >
            {location}
          </button>
        ))}
      </div>

      <DayFilter
        days={availableDays}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />

      <div className="events-list">
        {Object.entries(groupedByDay).map(([day, events]) => (
          <div key={day} className="day-group">
            <h2 className="day-header">{DAY_LABELS[day as Day]}</h2>
            {events.map((event, idx) => (
              <EventCard
                key={`${event.name}-${event.startTime}-${idx}`}
                id={generateEventId('workshops', event.day, event.name, event.startTime, event.location)}
                name={event.name}
                startTime={event.startTime}
                endTime={event.endTime}
                location={event.location}
                onClick={() => setModalEvent(event)}
              />
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!modalEvent}
        onClose={() => setModalEvent(null)}
        title={modalEvent?.name || ''}
        eventId={modalEvent ? generateEventId('workshops', modalEvent.day, modalEvent.name, modalEvent.startTime, modalEvent.location) : undefined}
        eventInfo={modalEvent ? { name: modalEvent.name, day: modalEvent.day, startTime: modalEvent.startTime, location: modalEvent.location } : undefined}
      >
        {modalEvent && (
          <>
            <div className="detail-row">
              <span className="detail-label">Day</span>
              <span className="detail-value">{DAY_LABELS[modalEvent.day as Day]}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time</span>
              <span className="detail-value">{modalEvent.startTime} - {modalEvent.endTime}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{modalEvent.lengthMinutes} minutes</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Location</span>
              <span className="detail-value">{modalEvent.location}</span>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
