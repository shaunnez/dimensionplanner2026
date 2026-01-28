import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface SelectionContextType {
  selectedItems: Set<string>;
  toggleSelection: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelections: () => void;
}

const SelectionContext = createContext<SelectionContextType | null>(null);

const STORAGE_KEY = 'dimension-planner-selections';

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedItems]));
  }, [selectedItems]);

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

  return (
    <SelectionContext.Provider value={{ selectedItems, toggleSelection, isSelected, clearSelections }}>
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
