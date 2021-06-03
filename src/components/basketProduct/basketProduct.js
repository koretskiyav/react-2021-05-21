import {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styles from './basketProduct.module.css';
import {ReactComponent as Minus} from '../../icons/minus.svg';
import {ReactComponent as Plus} from '../../icons/plus.svg';
import {ReactComponent as Delete} from '../../icons/delete.svg';
import {decrement, increment, deleting} from '../../redux/actions';

const BasketProduct = ({basketProduct, amount, increment, decrement, deleting, fetchData}) => {
    useEffect(() => {
        fetchData && fetchData(basketProduct.id);
    }, []); // eslint-disable-line

    return (
        <div className={styles.product} data-id="basketProduct">
            <div className={styles.content}>
                <div>
                    <h4 className={styles.title}>{basketProduct.name}</h4>
                    <div className={styles.price}>{basketProduct.price}$ * {amount} =  {basketProduct.price * amount} $</div>
                </div>
                <div>
                    <div className={styles.counter}>
                        <div className={styles.count} data-id="product-amount">
                            {amount}
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={decrement} data-id="product-decrement">
                                <Minus/>
                            </button>
                            <button className={styles.button} onClick={increment} data-id="product-increment">
                                <Plus/>
                            </button>
                            <button className={styles.button} onClick={deleting} data-id="product-deleting" >
                                <Delete/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

BasketProduct.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
    fetchData: PropTypes.func,
    // from connect
    amount: PropTypes.number,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    deleting: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
    amount: state.order[props.basketProduct.id] || 0,
});

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({
    increment: () => dispatch(increment(props.basketProduct.id)),
    decrement: () => dispatch(decrement(props.basketProduct.id)),
    deleting: () => dispatch(deleting(props.basketProduct.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketProduct);
