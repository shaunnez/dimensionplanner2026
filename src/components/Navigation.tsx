import './Navigation.css';

export type Category = 'music' | 'workshops' | 'performers' | 'vjs' | 'key-times' | 'map';

interface NavigationProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'workshops', label: 'Workshops', icon: '🧘' },
  { id: 'performers', label: 'Performers', icon: '🔥' },
  { id: 'vjs', label: 'VJs', icon: '🎬' },
  { id: 'key-times', label: 'Key Times', icon: '🕐' },
  { id: 'map', label: 'Map', icon: '🗺️' },
];

export function Navigation({ activeCategory, onCategoryChange }: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="nav-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            <span className="nav-icon">{cat.icon}</span>
            <span className="nav-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
