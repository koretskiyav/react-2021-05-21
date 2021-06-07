import {ADD_REVIEW} from "../constants";
import { v4 as uuid } from 'uuid';

export default () => (next) => (action) => {

    const {type, payload} = action

        if (type === ADD_REVIEW) {
            action.payload = {...payload, userId: uuid(), id: uuid()}
        }
        next(action);
}