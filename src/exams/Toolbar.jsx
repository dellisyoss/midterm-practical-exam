import { usePreferences } from '../components/PreferencesContext';

function Toolbar() {
  const { theme, setTheme } = usePreferences();

  return (
    <div className="row">
      <span>Theme: {theme}</span>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
    </div>
  );
}

export default Toolbar;