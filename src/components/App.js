import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReposList from './ReposList'
import { Route } from 'react-router-dom';
/* import About from './about';
import ProductsList from './ProductsList'
import ProductsDetail from './ProductDetail'; */

class App extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" component={ReposList} exact={true}/>
            </div>
        );
    }
}
export default App;