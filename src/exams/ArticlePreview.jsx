import { usePreferences } from '../components/PreferencesContext';

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();

  return (
    <article className={`theme-${theme}`} style={{ fontSize: `${fontSize}px` }}>
      <h3>Article Preview</h3>
      <p>
        React Hooks let function components use state and other React features.
        This text follows the theme and font size shared through context.
      </p>
    </article>
  );
}

export default ArticlePreview;
