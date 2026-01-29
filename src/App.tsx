import { useState } from 'react';
import { SelectionProvider } from './context/SelectionContext';
import { Navigation, type Category } from './components/Navigation';
import { MusicPage } from './pages/MusicPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { PerformersPage } from './pages/PerformersPage';
import { VJsPage } from './pages/VJsPage';
import { KeyTimesPage } from './pages/KeyTimesPage';
import { RemindersPage } from './pages/RemindersPage';
import { MapPage } from './pages/MapPage';
import './App.css';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('music');

  const renderPage = () => {
    switch (activeCategory) {
      case 'music':
        return <MusicPage />;
      case 'workshops':
        return <WorkshopsPage />;
      case 'performers':
        return <PerformersPage />;
      case 'vjs':
        return <VJsPage />;
      case 'key-times':
        return <KeyTimesPage />;
      case 'reminders':
        return <RemindersPage />;
      case 'map':
        return <MapPage />;
      default:
        return <MusicPage />;
    }
  };

  return (
    <SelectionProvider>
      <div className="app">
        <main className="main-content">
          {renderPage()}
        </main>
        <Navigation
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
    </SelectionProvider>
  );
}

export default App;
