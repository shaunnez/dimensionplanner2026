import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface Reminder {
  eventId: string;
  eventName: string;
  eventDay: string;
  eventTime: string;
  eventLocation: string;
  reminderTime: string; // ISO string
}

interface SelectionContextType {
  selectedItems: Set<string>;
  toggleSelection: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelections: () => void;
  reminders: Map<string, Reminder>;
  setReminder: (reminder: Reminder) => void;
  clearReminder: (eventId: string) => void;
  getReminder: (eventId: string) => Reminder | undefined;
  getAllReminders: () => Reminder[];
}

const SelectionContext = createContext<SelectionContextType | null>(null);

const STORAGE_KEY = 'dimension-planner-selections';
const REMINDERS_KEY = 'dimension-planner-reminders';

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return new Set(JSON.parse(stored));
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  const [reminders, setReminders] = useState<Map<string, Reminder>>(() => {
    const stored = localStorage.getItem(REMINDERS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Map(Object.entries(parsed));
      } catch {
        return new Map();
      }
    }
    return new Map();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedItems]));
  }, [selectedItems]);

  useEffect(() => {
    const obj = Object.fromEntries(reminders);
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(obj));
  }, [reminders]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedItems.has(id);
  }, [selectedItems]);

  const clearSelections = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const setReminder = useCallback((reminder: Reminder) => {
    setReminders(prev => {
      const next = new Map(prev);
      next.set(reminder.eventId, reminder);
      return next;
    });
  }, []);

  const clearReminder = useCallback((eventId: string) => {
    setReminders(prev => {
      const next = new Map(prev);
      next.delete(eventId);
      return next;
    });
  }, []);

  const getReminder = useCallback((eventId: string) => {
    return reminders.get(eventId);
  }, [reminders]);

  const getAllReminders = useCallback(() => {
    return Array.from(reminders.values()).sort((a, b) =>
      new Date(a.reminderTime).getTime() - new Date(b.reminderTime).getTime()
    );
  }, [reminders]);

  return (
    <SelectionContext.Provider value={{
      selectedItems,
      toggleSelection,
      isSelected,
      clearSelections,
      reminders,
      setReminder,
      clearReminder,
      getReminder,
      getAllReminders
    }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}

export function generateEventId(category: string, day: string, name: string, startTime: string, location?: string): string {
  return `${category}-${day}-${name}-${startTime}${location ? `-${location}` : ''}`.toLowerCase().replace(/\s+/g, '-');
}
