import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Total = ({ products, order, restaurants }) => {
  const totalCost = useMemo(() => {
    const resultProducts = products || [];
    !products &&
      Object.keys(order).forEach((key) => {
        restaurants.find((rest) => {
          return rest.menu?.find((prod) => {
            if (prod.id === key) {
              resultProducts.push(prod);
              return true;
            }
            return false;
          });
        });
      });
    return resultProducts.reduce((summ, next) => {
      return summ + next.price * order[next.id];
    }, 0);
  }, [restaurants, products, order]);

  return (
    <div data-id="product">
      <div>
        <h4 >Order info</h4>
        <p >Total price</p>
        <div >{totalCost} $</div>
      </div>
    </div>
  );
};

Total.propTypes = {
  toOrder: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  restaurants: PropTypes.arrayOf(PropTypes.shape({ menu: PropTypes.array }))
    .isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Total);