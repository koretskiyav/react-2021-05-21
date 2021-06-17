import { connect } from 'react-redux';
import { orderErrorSelector } from '../../redux/features/order';

const OrderError = ({ error }) => <div>{error}</div>;

const mapStateToProps = (state) => ({
  error: orderErrorSelector(state),
});
export default connect(mapStateToProps)(OrderError);
