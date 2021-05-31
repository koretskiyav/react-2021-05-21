// Cannot publish as Product.DataIds because Product will be wrapped: "counter(Product);"
// and DataIds will not be available in external modules

export const DataIds = {
  isNotAvailable: 'product-is-not-available',
  product: 'product',
  amount: 'product-amount',
  increment: 'product-increment',
  decrement: 'product-decrement',
};
