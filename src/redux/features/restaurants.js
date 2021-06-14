import {
    createAsyncThunk,
    createEntityAdapter, createNextState, createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';
import {STATUS} from '../constants';
import {isLoaded, shouldLoad} from '../utils';
import {addReview, reviewsSelector} from "./reviews";

export const loadRestaurants = createAsyncThunk(
    'restaurants/load',
    () => api.loadRestaurants(),
    {
        condition: (id, {getState}) =>
            shouldLoadRestaurantsSelector(getState()),
    }
);

const Restaurants = createEntityAdapter();

const initialState = {
    ...Restaurants.getInitialState(),
    status: {},
    error: null,
};

const {reducer} = createSlice({
    name: 'restaurants',
    initialState,
    extraReducers: {
        [loadRestaurants.pending.type]: (state, {meta}) => {
            state.status = STATUS.pending;
            state.error = null;
        },
        [loadRestaurants.fulfilled.type]: (state, action) => {
            state.status = STATUS.fulfilled;
            Restaurants.addMany(state, action);
        },
        [loadRestaurants.rejected.type]: (state, {meta, error}) => {
            state.status = STATUS.rejected;
            state.error = error;
        },
        [addReview.type]: (state, {meta, payload}) => {
            state.entities[payload.restaurantId].reviews.push(meta.reviewId);

            /*
                        const {name} = payload.review;
                        const {restaurantId} = meta;
                        Restaurants.addOne(state, {id: restaurantId, name});

                        return createNextState(state, (draft) => {
                            draft.entities[payload.restaurantId].reviews.push(meta.reviewId);
                        });
            */
        },
    },
});

export default reducer;

const restaurantsSelectors = Restaurants.getSelectors((state) => state.restaurants);

export const restaurantsSelector = restaurantsSelectors.selectEntities;
export const restaurantsStatusSelector = (state) =>
    state.restaurants.status;

export const restaurantsLoadedSelector = isLoaded(restaurantsStatusSelector);
export const shouldLoadRestaurantsSelector = shouldLoad(restaurantsStatusSelector);

export const restaurantSelector = (state, {id}) =>
    restaurantsSelectors.selectById(state, id);


export const restaurantsListSelector = createSelector(
    restaurantsSelector,
    Object.values
);

export const averageRatingSelector = createSelector(
    reviewsSelector,
    restaurantSelector,
    (reviews, restaurant) => {
        const ratings = restaurant.reviews.map((id) => reviews[id]?.rating || 0);
        return Math.round(
            ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
        );
    }
);
