import { restaurants } from '../../fixtures';

export default (state = 0, action) => {
    const { type } = action;
    switch (type) {
        default:
            return restaurants;
    }
}