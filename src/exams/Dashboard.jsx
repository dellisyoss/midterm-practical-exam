import { usePreferences } from '../components/PreferencesContext';
import Toolbar from './Toolbar';
import PreferencesPanel from './PreferencesPanel';
import ArticlePreview from './ArticlePreview';

// Practical Exam 4: Application Preferences (useContext and useState)
// Tree: App > PreferencesProvider > Dashboard > Toolbar, PreferencesPanel, ArticlePreview
// No preference props are passed down; each child reads the context itself.
function Dashboard() {
  const { theme } = usePreferences();

  return (
    <div className="card">
      <h1>Practical Exam 4: Application Preferences</h1>
      <div className={`theme-${theme}`}>
        <h2>Dashboard</h2>
        <Toolbar />
        <PreferencesPanel />
      </div>
      <ArticlePreview />
    </div>
  );
}

export default Dashboard;
