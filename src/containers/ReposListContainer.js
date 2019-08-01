import ReposList from '../components/ReposList';
import { loadingAC, loadedAC, errorAC } from '../actions/creators';
import {connect} from 'react-redux'

//returned obj's properties are passed down as prop={value}
const mapStateToProps = ( state ) => {
    return {
        status: state.repos.status
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        loading: () => {
            dispatch(loadingAC())
        },
        loaded: () => {
            dispatch(loadedAC())
        },
        errorS: () => {
            dispatch(errorAC())
        }
    }
}
export const ReposListContainer = connect( mapStateToProps, mapDispatchToProps )( ReposList );