const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadReviews: (id) => get(`/api/reviews`), // TODO: ?id=${id}
  loadProducts: (id) => get(`/api/products`), // TODO: ?id=${id}
};
