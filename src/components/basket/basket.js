import {connect} from "react-redux";
import Product from "../product";

const Basket = ({order, restaurants}) => {

    const BasketItems = Object.keys(order).map(orderKey => {

        const count = order[orderKey]

        const restaurant = restaurants.find((restaurant) => restaurant.menu.find((item) => item.id === orderKey ))
        const product = restaurant.menu.find((item) => item.id === orderKey )
        const sumPrice = product.price * count
        return sumPrice > 0 && <Product
            product={product}
            key={orderKey}
            sumPrice={sumPrice}
            deleteEnabled={true}
            amount={order[orderKey]}/>
    })

    const allSum = Object.keys(order).length > 0 ? Object.keys(order).map(orderKey => {
        const count = order[orderKey]
        const restaurant = restaurants.find((restaurant) => restaurant.menu.find((item) => item.id === orderKey ))
        const product = restaurant.menu.find((item) => item.id === orderKey )
        const price = product.price * count
        return price || 0
    }).reduce((a,b) => a+b) : 0

    /***
     * вот тут не удалось вывести ${BasketItems} в одну строчку
     * allSum > 0 ? `Ваш заказ  ${BasketItems} на сумму: ${allSum}` : 'Корзина скучает'
     * */

    if (allSum > 0) {
        return (
            <div>
                `Ваш заказ на сумму: ${allSum}`
                {BasketItems}
            </div>
        )
    }
     else {
        return (
            <p>'Корзина скучает:((' </p>
            )

    }
}
const mapStateToProps = (state) => ({
    order: state.order || 0,
    restaurants: state.restaurants
});
export default connect(mapStateToProps, null)(Basket);