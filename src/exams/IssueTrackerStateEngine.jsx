import { useState } from 'react';
import { issueReducer, initialState } from '../reducers/issueReducer';
import { usePersistentReducer } from '../hooks/usePersistentReducer';

// Practical Exam 6: Issue Tracker State Engine (useReducer and custom Hooks)
function IssueTrackerStateEngine() {
  const [state, dispatch] = usePersistentReducer(issueReducer, initialState, 'issues');
  const [title, setTitle] = useState('');

  // Derived during render, no extra state.
  const openCount = state.issues.filter((i) => !i.done).length;
  const doneCount = state.issues.length - openCount;
  const visible = state.issues.filter(
    (i) =>
      state.filter === 'all' ||
      (state.filter === 'open' && !i.done) ||
      (state.filter === 'done' && i.done)
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // The action shape must match the reducer: { type, payload: { title } }.
    dispatch({ type: 'ADD_ISSUE', payload: { title: title.trim() } });
    setTitle('');
  };

  return (
    <div className="card">
      <h1>Practical Exam 6: Issue Tracker State Engine</h1>

      <form className="row" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New issue title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="row">
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'all' } })}
          disabled={state.filter === 'all'}
        >
          All ({state.issues.length})
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'open' } })}
          disabled={state.filter === 'open'}
        >
          Open ({openCount})
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'done' } })}
          disabled={state.filter === 'done'}
        >
          Done ({doneCount})
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear Done</button>
      </div>

      <ul className="list">
        {visible.map((issue) => (
          <li key={issue.id}>
            <span style={{ textDecoration: issue.done ? 'line-through' : 'none' }}>
              #{issue.id} {issue.title}
            </span>{' '}
            <button onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}>
              Toggle
            </button>{' '}
            <button onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="hint">No issues to show.</p>}
    </div>
  );
}

export default IssueTrackerStateEngine;