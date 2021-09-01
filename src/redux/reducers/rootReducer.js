import { combineReducers } from 'redux';

import bookingReducer from './bookingReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
    login: userReducer,
    booking: bookingReducer
});

export default rootReducer;