const get = (url) => fetch(url).then((res) => res.json());

export default {
  loadRestaurants: () => get('/api/restaurants'),
  loadProducts: (id) => get(`/api/products?id=${id}`),
  loadReviews: (id) => get(`/api/reviews?id=${id}`),
  loadUsers: () => get('/api/users'),
  order: (order) => fetch('/api/ordera', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify([{ id: "d75f762a-eadd-49be-8918-ed0daa8dd024", amount: 1 }])
    body: JSON.stringify(order)
  }).then(res => res.json()),
};
