import { useState } from 'react';

// Practical Exam 1: Smart Task Counter (useState)
function SmartTaskCounter() {
  // Req 1. Create count and target state values with valid initial values.
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);
  const targetReached = count >= target;

  // Req 2. Increment, Decrement, and Reset. Count never becomes negative.
  const increment = () => setCount((c) => Math.min(target, c + 1));
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(0);

  // Req 3. Plus two using two queued functional updates.
  // Debugging case: setCount(count + 1) twice only adds one, because both
  // calls read the same `count` captured by this render. The functional form
  // (c => c + 1) reads the latest queued value, so both updates apply.
  const addTwo = () => {
    setCount((c) => Math.min(target, c + 1));
    setCount((c) => Math.min(target, c + 1));
  };

  const changeTarget = (e) => {
    const value = Number(e.target.value);
    if (value >= 1) setTarget(value);
  };

  // Req 4. Status is derived from state, no separate status state.
  let status = 'In progress';
  if (count === 0) status = 'Not started';
  if (targetReached) status = 'Target reached';

  // Req 5. Disable Increment and plus two at the target boundary.
  const isAddTwoDisabled = count + 2 > target;

  return (
    <div className="card">
      <h1>Practical Exam 1: Smart Task Counter</h1>

      <label htmlFor="target">Target tasks:</label>
      <input
        className="task"
        id="target"
        type="number"
        min="1"
        value={target}
        onChange={changeTarget}
      />

      <p className="counter">
        {count} / {target}
      </p>
      <p className="status">Status: {status}</p>

      <h3>Controls</h3>
      <div className="row">
        <button onClick={decrement} disabled={count === 0}>- 1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment} disabled={targetReached}>+ 1</button>
        <button onClick={addTwo} disabled={isAddTwoDisabled}>+ 2</button>
      </div>
    </div>
  );
}

export default SmartTaskCounter;