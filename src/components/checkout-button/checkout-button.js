import Button from '../button';
import { connect } from 'react-redux';
import { getOrderForSubmit, submitOrder } from '../../redux/features/order';

const ChekoutButton = ({ children, orderForSubmit, submitOrder }) => {
  return (
    <Button onClick={() => submitOrder(orderForSubmit)} primary block >
      {children}
    </Button>
  );
}

const mapsStateToProps = (state, props) => ({
  orderForSubmit: getOrderForSubmit(state),
});

export default connect(mapsStateToProps, { submitOrder })(ChekoutButton);