const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadReviews: (id) => get(`/api/reviews?id=${id}`),
  loadUsers: () => get('/api/users'),
  loadProductsByRestaurant: (id) => get(`/api/products/?id=${id}`),
};
