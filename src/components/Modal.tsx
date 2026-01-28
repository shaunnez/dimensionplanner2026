import { useEffect, useCallback, type ReactNode } from 'react';
import { useSelection, generateEventId } from '../context/SelectionContext';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  eventId?: string;
}

export function Modal({ isOpen, onClose, title, children, eventId }: ModalProps) {
  const { isSelected, toggleSelection } = useSelection();
  const selected = eventId ? isSelected(eventId) : false;

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

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
        {eventId && (
          <div className="modal-footer">
            <button
              className={`modal-toggle-btn ${selected ? 'selected' : ''}`}
              onClick={handleToggle}
            >
              {selected ? 'Remove from My Schedule' : 'Add to My Schedule'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { generateEventId };
