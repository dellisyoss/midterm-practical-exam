import { usePreferences } from '../components/PreferencesContext';

const FONT_SIZES = [14, 16, 18];

function PreferencesPanel() {
  const { fontSize, setFontSize } = usePreferences();

  return (
    <div className="row">
      <span>Font size:</span>
      {FONT_SIZES.map((size) => (
        <button key={size} onClick={() => setFontSize(size)} disabled={size === fontSize}>
          {size}px
        </button>
      ))}
    </div>
  );
}

export default PreferencesPanel;