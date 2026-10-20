import { test } from 'node:test';
import assert from 'node:assert/strict';
import { issueReducer, initialState } from './issueReducer.js';

test('ADD_ISSUE adds an open issue and increments nextId', () => {
  const next = issueReducer(initialState, {
    type: 'ADD_ISSUE',
    payload: { title: 'Fix bug' },
  });
  assert.deepEqual(next.issues, [{ id: 1, title: 'Fix bug', done: false }]);
  assert.equal(next.nextId, 2);
  assert.equal(initialState.issues.length, 0); // original not mutated
});

test('TOGGLE_ISSUE flips done for the matching issue only', () => {
  const state = {
    issues: [
      { id: 1, title: 'A', done: false },
      { id: 2, title: 'B', done: false },
    ],
    filter: 'all',
    nextId: 3,
  };
  const next = issueReducer(state, { type: 'TOGGLE_ISSUE', payload: { id: 2 } });
  assert.equal(next.issues[0].done, false);
  assert.equal(next.issues[1].done, true);
  assert.equal(state.issues[1].done, false); // original not mutated
});

test('CLEAR_DONE removes completed issues', () => {
  const state = {
    issues: [
      { id: 1, title: 'A', done: true },
      { id: 2, title: 'B', done: false },
    ],
    filter: 'all',
    nextId: 3,
  };
  const next = issueReducer(state, { type: 'CLEAR_DONE' });
  assert.deepEqual(next.issues, [{ id: 2, title: 'B', done: false }]);
});
