import {Component} from "react";
import styles from "../basketItem/basketItem.module.css";
import {ReactComponent as Minus} from "../../../icons/minus.svg";
import {ReactComponent as Plus} from "../../../icons/plus.svg";
import {ReactComponent as Remove} from "../../../icons/remove.svg";
import {decrement, increment, remove} from "../../../redux/actions";
import {connect} from "react-redux";

class BasketItem extends Component {

    render() {
        const {product, increment, decrement, remove} = this.props;

        return (
            <div className={styles.product} data-id="product">
                <div className={styles.content}>
                    <div>
                        <h4 className={styles.title}>{product.name}</h4>
                        <div className={styles.price}>{product.price} $</div>
                        <div className={styles.price}>{product.price * product.amount} $</div>
                    </div>
                    <div>
                        <div className={styles.counter}>
                            <div className={styles.count} data-id="product-amount">
                                {product.amount}
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.button}
                                    onClick={decrement}
                                    data-id="product-decrement"
                                >
                                    <Minus/>
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={increment}
                                    data-id="product-increment"
                                >
                                    <Plus/>
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={remove}
                                    data-id="product-remove"
                                >
                                    <Remove/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => ({
    amount: state.order[props.product.id] || 0,
});

// const mapDispatchToProps = {
//   increment,
//   decrement,
// };

const mapDispatchToProps = (dispatch, props) => ({
    increment: () => dispatch(increment(props.product.id)),
    decrement: () => dispatch(decrement(props.product.id)),
    remove: () => dispatch(remove(props.product.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);