import { LOADING, LOADED, ERROR } from '../actions/constants';

//action creators
const loadingAC = () => ({
    type: LOADING
});
const loadedAC = () => ({
    type: LOADED
});
const errorAC = () => ({
    type: ERROR
});

export {
    loadingAC,
    loadedAC,
    errorAC
}