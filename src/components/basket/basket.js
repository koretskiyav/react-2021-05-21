import PropTypes from 'prop-types';
import {Component} from 'react';
import BasketProduct from '../basketProduct';

import styles from './basket.module.css';
import {connect} from "react-redux";

class Basket extends Component {
    static propTypes = {
        basket: PropTypes.shape(PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
            }).isRequired
            ).isRequired,
            PropTypes.number
        ).isRequired
    };


    render() {
        const {basket, sum} = this.props;
        const state = window.store.getState();

        return (
            <div className={styles.basket}>
                <div>
                    {basket.filter((product) => state.mode[product.id]).map((product) => (
                        <BasketProduct key={product.id} basketProduct={product}/>
                    ))}
                </div>
                <div>
                    <h4 className={styles.title}>Всего: {sum} $</h4>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    sum: props.basket.reduce((s, prod) => s + (state.order[prod.id] || 0) * prod.price, 0),
});

export default connect(mapStateToProps, null)(Basket);
