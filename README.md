# Midterm Practical Exam

## Structure

```
src/
  main.jsx
  App.jsx                         calls Header, Sidebar, and the selected exam
  App.css
  components/Header.jsx           "Midterm Practical Exam"
  components/Sidebar.jsx          tabs for the 6 exams
  context/PreferencesContext.jsx  context, PreferencesProvider, usePreferences
  hooks/usePersistentReducer.js
  reducers/issueReducer.js
  reducers/issueReducer.test.js
  data/starter-data.js            USERS (Exam 2)
  data/products.js                600 generated products (Exam 5)
  exams/SmartTaskCounter.jsx      Exam 1  useState
  exams/LiveSearchTimer.jsx       Exam 2  useEffect (includes SessionTimer)
  exams/AccessibleFormToolkit.jsx Exam 3  useRef and useState
  exams/Dashboard.jsx             Exam 4  useContext (Toolbar, PreferencesPanel, ArticlePreview)
  exams/ProductExplorer.jsx       Exam 5  useMemo and useCallback (ProductList is React.memo)
  exams/IssueTrackerStateEngine.jsx Exam 6 useReducer and custom Hook
```

## Known limitations

- Exam 1: "+ 2" is disabled when it would pass the target (for example count 4 with target 5), so the count never exceeds the target.
- Exam 2: the search delay (500 ms) is simulated with a timeout, using local data only.
- Exam 6: issues are saved in localStorage under the key `issues`.

## Test steps

1. **Exam 1:** target 5 and count 0; count 4 then + 2; count 0 then - 1; Reset after the target is reached.
2. **Exam 2:** type quickly and see only the final result; check the browser tab title shows the result count; hide and show the timer.
3. **Exam 3:** submit empty (focus goes to name), then fix name (focus goes to email), then email (focus goes to password); submit twice to see the previous email.
4. **Exam 4:** toggle the theme and change the font size; Dashboard and ArticlePreview update with no preference props.
5. **Exam 5:** open the browser console, click the unrelated counter, and confirm "ProductList rendered" does not print.
6. **Exam 6:** add, toggle, delete, filter, Clear Done, then refresh to confirm persistence. Run `npm test`.

## Exam 5: when memoization is unnecessary

Memoizing a cheap calculation, such as filtering a list of 10 items, is unnecessary. The cost of tracking dependencies and caching the result is about the same as just recomputing it.

## Debugging notes

- **Exam 1:** `setCount(count + 1)` twice only adds one, because both calls use the same `count` captured in that render. Fix: `setCount(c => c + 1)` twice.
- **Exam 2:** an effect that depends on state it sets loops forever (depend on `[query]`). A timer using `setSeconds(seconds + 1)` with `[]` sticks at 1 (use `s => s + 1`). Cleanups: `clearTimeout` cancels the old search and `clearInterval` stops the timer on unmount.
- **Exam 3:** changing `ref.current` does not schedule a render, so visible data uses state.
- **Exam 4:** with no provider, `usePreferences` throws a clear error. Two separately created contexts do not share values, so one exported context is used by every file. State lives in the provider, so no intermediate props are needed.
- **Exam 5:** missing `query` in `useMemo` gives stale results; a `useCallback` that reads `selectedId` needs it in the dependencies; side effects like analytics belong in `useEffect`.
- **Exam 6:** mutation is replaced by new objects and arrays; the dispatch shape must be `{ type, payload: { ... } }`; the default branch must `return state`.