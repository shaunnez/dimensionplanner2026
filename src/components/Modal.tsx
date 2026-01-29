import { useEffect, useCallback, useState, type ReactNode } from 'react';
import { useSelection, generateEventId } from '../context/SelectionContext';
import './Modal.css';

interface EventInfo {
  name: string;
  day: string;
  startTime: string;
  location: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  eventId?: string;
  eventInfo?: EventInfo;
}

export function Modal({ isOpen, onClose, title, children, eventId, eventInfo }: ModalProps) {
  const { isSelected, toggleSelection, getReminder, setReminder, clearReminder } = useSelection();
  const selected = eventId ? isSelected(eventId) : false;
  const existingReminder = eventId ? getReminder(eventId) : undefined;

  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      // Reset reminder picker state
      setShowReminderPicker(false);
      if (existingReminder) {
        const dt = new Date(existingReminder.reminderTime);
        setReminderDate(dt.toISOString().split('T')[0]);
        setReminderTime(dt.toTimeString().slice(0, 5));
      } else {
        setReminderDate('');
        setReminderTime('');
      }

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, existingReminder]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleToggle = useCallback(() => {
    if (eventId) {
      toggleSelection(eventId);
    }
  }, [eventId, toggleSelection]);

  const handleSetReminder = useCallback(() => {
    if (eventId && eventInfo && reminderDate && reminderTime) {
      const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
      setReminder({
        eventId,
        eventName: eventInfo.name,
        eventDay: eventInfo.day,
        eventTime: eventInfo.startTime,
        eventLocation: eventInfo.location,
        reminderTime: reminderDateTime.toISOString()
      });
      setShowReminderPicker(false);
    }
  }, [eventId, eventInfo, reminderDate, reminderTime, setReminder]);

  const handleClearReminder = useCallback(() => {
    if (eventId) {
      clearReminder(eventId);
      setReminderDate('');
      setReminderTime('');
      setShowReminderPicker(false);
    }
  }, [eventId, clearReminder]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {eventId && eventInfo && (
          <div className="modal-footer">
            <button
              className={`modal-toggle-btn ${selected ? 'selected' : ''}`}
              onClick={handleToggle}
            >
              {selected ? 'Remove from My Schedule' : 'Add to My Schedule'}
            </button>

            {existingReminder && !showReminderPicker ? (
              <div className="reminder-info">
                <span className="reminder-icon">🔔</span>
                <span className="reminder-text">
                  Reminder: {formatReminderTime(existingReminder.reminderTime)}
                </span>
                <button className="reminder-edit-btn" onClick={() => setShowReminderPicker(true)}>
                  Edit
                </button>
                <button className="reminder-clear-btn" onClick={handleClearReminder}>
                  Clear
                </button>
              </div>
            ) : showReminderPicker ? (
              <div className="reminder-picker">
                <div className="reminder-picker-header">
                  <span>Set Reminder</span>
                  <button className="reminder-picker-close" onClick={() => setShowReminderPicker(false)}>
                    Cancel
                  </button>
                </div>
                <div className="reminder-inputs">
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="reminder-date-input"
                  />
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="reminder-time-input"
                  />
                </div>
                <div className="reminder-actions">
                  <button
                    className="reminder-save-btn"
                    onClick={handleSetReminder}
                    disabled={!reminderDate || !reminderTime}
                  >
                    Save Reminder
                  </button>
                  {existingReminder && (
                    <button className="reminder-delete-btn" onClick={handleClearReminder}>
                      Delete Reminder
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                className="modal-reminder-btn"
                onClick={() => setShowReminderPicker(true)}
              >
                🔔 Set Reminder
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { generateEventId };
