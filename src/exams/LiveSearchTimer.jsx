import { useState, useEffect } from 'react';
import { USERS } from '../data/starter-data';

function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Debugging case: setSeconds(seconds + 1) with [] stays stuck at 1, because
    // the callback captured the initial seconds. The functional update fixes it.
    const id = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup: stops the interval when the component unmounts, so no duplicate
    // timer keeps running after navigation or remount.
    return () => {
      clearInterval(id);
      console.log('Timer cleaned up');
    };
  }, []);

  return <p className="timer">Session time: {seconds} seconds</p>;
}

// Practical Exam 2: Live Search and Timer (useEffect)
function LiveSearchTimer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [isSearching, setIsSearching] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Filter users after the query changes, with a delay that simulates a request.
  // Depends on [query] only. Depending on `results` (which it sets) would loop.
  useEffect(() => {
    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const q = query.toLowerCase();
      setResults(
        USERS.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.role.toLowerCase().includes(q)
        )
      );
      setIsSearching(false);
    }, 500);

    // Cleanup: cancels the previous delayed search, so fast typing never
    // displays an outdated result.
    return () => {
      clearTimeout(timeoutId);
      console.log('Cancelled search for query:', query);
    };
  }, [query]);

  // Show the number of visible results in the document title.
  useEffect(() => {
    document.title = `${results.length} result(s)`;
  }, [results]);

  return (
    <div className="card">
      <h1>Practical Exam 2: Live Search and Timer</h1>

      {showTimer && <SessionTimer />}
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Hide' : 'Show'} Timer
      </button>

      <div className="row">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isSearching && <p className="hint">Searching...</p>}

      <p>Visible results: {results.length}</p>
      <ul className="list">
        {results.map((user) => (
          <li key={user.id}>
            {user.name} <span className="role">{user.role}</span>
          </li>
        ))}
      </ul>
      {!isSearching && results.length === 0 && (
        <p className="hint">No results found.</p>
      )}
    </div>
  );
}

export default LiveSearchTimer;