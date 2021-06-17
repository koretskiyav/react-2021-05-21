const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (id) => get(`/api/products?id=${id}`),
  loadReviews: (id) => get(`/api/reviews?id=${id}`),
  loadUsers: () => get('/api/users'),
  sendOrder: (order) =>
    fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }),
};
