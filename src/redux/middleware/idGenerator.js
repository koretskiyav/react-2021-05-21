import uuid from 'uuid';
import { ADD_REVIEW, ADD_USER } from '../constants';


export default (store) => (next) => (action) => {
  const id = uuid();
  if (action.type === ADD_USER){
    action = { ...action, generatedId: id };
    next(action);
  }else if (action.type === ADD_REVIEW){
    debugger
    action = { type: ADD_REVIEW, previousReview: store.getState().reviews, text: action.text, name: action.name, rating: action.rating
    };
    next(action);

  }

};
