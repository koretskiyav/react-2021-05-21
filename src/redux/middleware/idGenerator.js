import uuid from 'uuid';


export default (store) => (next) => (action) => {
  const id = uuid();
  
  action = { ...action, generatedId: id };
  next(action);

};
