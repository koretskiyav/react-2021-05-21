import Product from '../product'

const Order = ({orderItems}) => (
    <div>
      {
        (orderItems?.length || 0) < 1 
        ? "Пусто :("
        : orderItems.map((product) => (
            <Product key={product.id} product={product} enableReset={true} />
      ))}
    </div>
);

export default Order;