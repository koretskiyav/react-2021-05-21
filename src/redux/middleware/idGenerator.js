import uuid from 'uuid';
import { ADD_REVIEW, ADD_USER } from '../constants';


const savedUsers = {};
export default (store) => (next) => (action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      const d = Object.keys(savedUsers).find(u => savedUsers[u] === action.name);
      
      action = {
        type: ADD_REVIEW, text: action.text, name: d, rating: action.rating
      };
      next(action);
      break;
    case ADD_USER:
      const id = uuid();
      savedUsers[id] = action.name;
      action = { ...action, generatedId: id };
      next(action);
      break;
    default:
      next(action);
  }
};
