import { connect } from 'react-redux';
import Item from './item';

const Basket = ({ restaurants, order }) => {
  // Здесь возможно было бы хорошо переиспользовать Product, или
  // хотя бы навести порядок в пропсах и не делать find дважды,
  // но уже не успеваю
  return (
    <div>
      <h1>Корзина</h1>
      {Object.keys(order).map((item) => (
        <div key={item}>
          {order[item] > 0 && (
            <Item
              productId={item}
              amount={order[item]}
              productName={
                restaurants
                  .find((restaurant) =>
                    restaurant.menu.find((p) => p.id === item)
                  )
                  .menu.find((pp) => pp.id === item).name
              }
              price={
                restaurants
                  .find((restaurant) =>
                    restaurant.menu.find((p) => p.id === item)
                  )
                  .menu.find((pp) => pp.id === item).price
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Basket);
