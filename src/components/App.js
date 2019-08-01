import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {ReposListContainer} from '../containers/ReposListContainer'
import { Route } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" component={ReposListContainer} exact={true}/>
            </div>
        );
    }
}
export default App;