const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadReviews: (id) => get(`/api/reviews?id=${id}`),
  loadProducts: (id) => get(`/api/products?id=${id}`),
  loadUsers: (id) => get('/api/users'),
};
