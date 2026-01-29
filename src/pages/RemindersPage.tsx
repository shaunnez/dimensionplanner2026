import { useSelection, type Reminder } from '../context/SelectionContext';
import { DAY_LABELS, type Day } from '../data/festivalData';
import './PageStyles.css';

export function RemindersPage() {
  const { getAllReminders, clearReminder } = useSelection();
  const reminders = getAllReminders();

  const isUpcoming = (reminder: Reminder) => {
    return new Date(reminder.reminderTime) > new Date();
  };

  const isPast = (reminder: Reminder) => {
    return new Date(reminder.reminderTime) <= new Date();
  };

  const upcomingReminders = reminders.filter(isUpcoming);
  const pastReminders = reminders.filter(isPast);

  return (
    <div className="page">
      <h1 className="page-title">Reminders</h1>

      {reminders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <p className="empty-text">No reminders set yet</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>
            Tap on any event and set a reminder to be notified
          </p>
        </div>
      ) : (
        <>
          {upcomingReminders.length > 0 && (
            <div className="reminders-section">
              <h2 className="section-title">
                <span>⏰</span>
                Upcoming
              </h2>
              {upcomingReminders.map(reminder => (
                <ReminderCard
                  key={reminder.eventId}
                  reminder={reminder}
                  onClear={() => clearReminder(reminder.eventId)}
                />
              ))}
            </div>
          )}

          {pastReminders.length > 0 && (
            <div className="reminders-section">
              <h2 className="section-title" style={{ opacity: 0.6 }}>
                <span>✓</span>
                Past
              </h2>
              {pastReminders.map(reminder => (
                <ReminderCard
                  key={reminder.eventId}
                  reminder={reminder}
                  onClear={() => clearReminder(reminder.eventId)}
                  isPast
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ReminderCard({ reminder, onClear, isPast }: { reminder: Reminder; onClear: () => void; isPast?: boolean }) {
  const formatReminderTime = (isoString: string) => {
    const dt = new Date(isoString);
    return dt.toLocaleString('en-NZ', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`reminder-card ${isPast ? 'past' : ''}`}>
      <div className="reminder-card-icon">🔔</div>
      <div className="reminder-card-content">
        <h3 className="reminder-card-title">{reminder.eventName}</h3>
        <p className="reminder-card-event">
          {DAY_LABELS[reminder.eventDay as Day] || reminder.eventDay} @ {reminder.eventTime} - {reminder.eventLocation}
        </p>
        <p className="reminder-card-time">
          Reminder: {formatReminderTime(reminder.reminderTime)}
        </p>
      </div>
      <button className="reminder-card-clear" onClick={onClear} aria-label="Clear reminder">
        &times;
      </button>
    </div>
  );
}
