import {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Basket from '../basket';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import styles from './restaurant.module.css';

const Restaurant = ({restaurant}) => {
    const [activeView, setActiveView] = useState('Корзина');
    const {name, menu, reviews} = restaurant;

    const averageRating = useMemo(() => {
        const total = reviews.reduce((acc, {rating}) => acc + rating, 0);
        return Math.round(total / reviews.length);
    }, [reviews]);

    return (
        <div>
            <Banner heading={name}>
                <Rate value={averageRating}/>
            </Banner>
            <div className={styles.basket}>
                <button onClick={() => {
                    if (activeView == 'Корзина') {
                        const state = window.store.getState();
                        menu.map((product) => {state.mode[product.id] = state.order[product.id] > 0;});
                    }
                    setActiveView(activeView == 'Корзина' ? 'Меню' : 'Корзина');
                }}>{activeView}</button>
            </div>
            {
                activeView == 'Корзина' &&
                <div className={styles.restaurant}>
                    <Menu menu={menu} key={restaurant.id}/>
                    <Reviews reviews={reviews}/>
                </div>
            }
            {
                activeView == 'Меню' &&
                <div className={styles.restaurant}>
                    <Basket basket={menu}  key={restaurant.id}/>
                </div>
            }
        </div>
    );
};

Restaurant.propTypes = {
    restaurant: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        menu: PropTypes.array,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                rating: PropTypes.number.isRequired,
            }).isRequired
        ).isRequired,
    }).isRequired,
};

export default Restaurant;
