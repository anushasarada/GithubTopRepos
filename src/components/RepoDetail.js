import React, { Component } from 'react';
import ReposService from '../services/ReposService';
/* import Reviews from './Reviews';
import AddReview from './AddReview'; */

class RepoDetail extends Component {
    state = {
        status: 'LOADING',
        repo: []
    }
    render() {
        let el;
        switch (this.state.status) {
            case 'LOADING':
                el = (
                    <div className="alert alert-info">
                        Products are being fetched.
                    </div>
                );
                break;
            case 'LOADED':
                el = (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-4">
                                <h1>{this.state.products.name}</h1>
                                <hr />
                            </div>
                            <div className="col-4">
                                <img src={this.state.products.imageUrl} alt={this.state.products.name} className="img-fluid" />
                            </div>
                            <div className="col-8">
                                <p style={{ fontSize: '1.5em' }}>
                                    {this.state.products.description}
                                </p>
                                <br/>
                                <section>
                                    <div>Rating:{this.state.products.starRating}/5</div>
                                    <br/>
                                    <div>Price:${this.state.products.price}</div>
                                    <br/>
                                    <button className="btn btn-primary">
                                        Buy
                                    </button>
                                </section>
                            </div>
                            <div className="col-12">
                                <Reviews reviews={this.state.products.reviews}/>
                            </div>
                            <div className="col-12">
                                <AddReview id={this.state.products.id}/>
                            </div>
                        </div>
                        <br/>
                        
                    </div>
                );
                break;
            case 'ERROR':
                el = (
                    <div classNameName="alert alert-info">
                        <h4>Unable to fetch products</h4>
                        <hr />
                        {this.state.error.message}
                    </div>
                );
                break;
            default:
                el = (
                    <div classNameName="alert alert-info">
                        Something wrong.
                        </div>
                );
                break;
        }
        return (
            <div>
                {el}
            </div>
        );
    }
    componentDidMount() {
        ProductsService.getProduct(this.props.match.params.id)
            .then(products => {
                this.setState({
                    products: products,
                    status: 'LOADED'
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                    status: 'ERROR'
                });
            })
    }
}

export default RepoDetail;