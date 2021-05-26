import Product from './product';

export default function Menu(props) {
  return (
    <div>
      <h1>Menu</h1>
      {props.menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
