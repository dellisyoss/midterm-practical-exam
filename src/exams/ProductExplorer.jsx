import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductList from './ProductList';

// Practical Exam 5: Product Explorer Performance Repair (useMemo and useCallback)
function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('asc');
  const [selectedId, setSelectedId] = useState(null);
  const [counter, setCounter] = useState(0); // unrelated state

  // Memoized filtered and sorted list. Dependencies are complete: leaving out
  // `query` here would show stale results.
  const visible = useMemo(() => {
    console.log('Filtering and sorting...');
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'All' || p.category === category)
    ).sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
  }, [query, category, sort]);

  // Memoized selection callback. The functional update means it does not need
  // selectedId as a dependency, so it stays stable. (If it read selectedId
  // directly, selectedId would have to be in the array.)
  const handleSelect = useCallback((id) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  // Debugging case: the analytics call is a side effect, so it lives in
  // useEffect and not inside useMemo.
  useEffect(() => {
    console.log('Analytics: search tracked ->', query);
  }, [query]);

  const selected = PRODUCTS.find((p) => p.id === selectedId);

  return (
    <div className="card">
      <h1>Practical Exam 5: Product Explorer Performance Repair</h1>

      <div className="row">
        <button onClick={() => setCounter((c) => c + 1)}>
          Unrelated counter: {counter}
        </button>
      </div>

      <div className="row">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>

      <p>
        Showing {visible.length} of {PRODUCTS.length} products. Selected:{' '}
        {selected ? selected.name : 'none'}
      </p>

      <ProductList items={visible} onSelect={handleSelect} selectedId={selectedId} />
    </div>
  );
}

export default ProductExplorer;