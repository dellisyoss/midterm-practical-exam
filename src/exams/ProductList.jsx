import { memo } from 'react';

function ProductList({ items, onSelect, selectedId }) {
  // Console evidence: this should NOT print when the unrelated counter changes.
  console.log('ProductList rendered');

  return (
    <ul className="list">
      {items.map((p) => (
        <li key={p.id}>
          <input
            type="checkbox"
            checked={p.id === selectedId}
            onChange={() => onSelect(p.id)}
          />{' '}
          {p.name} | {p.category} | ${p.price}
        </li>
      ))}
    </ul>
  );
}

export default memo(ProductList);
