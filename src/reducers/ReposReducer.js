import { LOADING, LOADED, ERROR } from '../actions/constants'

//define reducer
const ReposReducer = (curState = { status:'' }, action) => {
    let newState;

    switch (action.type) {
        case LOADING: newState = { status: LOADING }; break;
        case LOADED: newState = { status: LOADED }; break;
        case ERROR: newState = { status: ERROR }; break;
        default: newState = curState; break;
    }

    return newState;
}
export default ReposReducer;