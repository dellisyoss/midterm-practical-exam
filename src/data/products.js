export const CATEGORIES = ['Books', 'Games', 'Home', 'Toys', 'Electronics'];

// 600 generated products
export const PRODUCTS = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
  price: ((i * 37) % 500) + 10,
}));
