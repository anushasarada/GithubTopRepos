import ReposReducer from '../reducers/ReposReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

function getStore() {
    //createStore accepts only 1 reducers
    return createStore(
        /* combinedReducer */
        combineReducers(
            {
                repos: ReposReducer,
            }
        ),
        applyMiddleware(thunk)
    )
}

export default getStore;