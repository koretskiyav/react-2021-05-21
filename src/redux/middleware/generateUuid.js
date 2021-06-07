import {ADD_REVIEW} from "../constants";

export default (store) => (next) => (action) => {

    const {type, payload} = action
    const userId =  uuidv4();
    const reviewId = uuidv4();


    if (type === ADD_REVIEW){
        store = {
           user: {
               ...store.user,
               id: userId,
               name: payload.name
           },
            reviews: {
               ...store.reviews,
                id:reviewId,
                userId,
                text: payload.text
            },
           ...store
        }
    }
    next(action);
}