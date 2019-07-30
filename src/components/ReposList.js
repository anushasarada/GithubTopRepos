import React from 'react';
import { Link } from 'react-router-dom';
import ReposService from '../services/ReposService'
//import ProductsService from '../services/products';
import axios from 'axios';

class ReposList extends React.Component {
    state = {
        status: 'LOADING',
        repos: []
    }
    changePage = (type) => {
        this.setState({
            status: 'LOADING'
        });
        if (type == 'all') {
            
        }
        else {
            console.log(`https://api.github.com/search/repositories?q=topic:${type}&sort=stars&order=desc`);
            axios.get(`https://api.github.com/search/repositories?q=topic:${type}&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
                .then(repos => {
                    this.setState({
                        repos: repos,
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
    render() {
        let el;
        switch (this.state.status) {
            case 'LOADING':
                el = (
                    <div className="alert alert-info">
                        Repos are being fetched.
                    </div>
                );
                break;
            case 'LOADED':
                el = (
                    <div>
                        <nav aria-label="Pagination">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="/" data-page="All" onClick={() => this.changePage('all')}>All</a></li>
                                <li className="page-item"><a className="page-link" href="/" data-page="JavaScript" onClick={() => this.changePage('javascript')}>JavaScript</a></li>
                                <li className="page-item"><a className="page-link" href="/" data-page="Ruby" onClick={() => this.changePage('ruby')}>Ruby</a></li>
                                <li className="page-item"><a className="page-link" href="#" data-page="Java" onClick={() => this.changePage('java')}>Java</a></li>
                                <li className="page-item"><a className="page-link" href="#" data-page="CSS" onClick={() => this.changePage('css')}>CSS</a></li>
                                <li className="page-item"><a className="page-link" href="#" data-page="Python" onClick={() => this.changePage('python')}>Python</a></li>
                            </ul>
                        </nav>
                        <div className="alert alert-info">
                            <div className="row">
                                {
                                    this.state.repos.map((repo, index) => (
                                        <div className="col-3 my-3" key={repo.id}>
                                            <Link to={`/${repo.id}`} style={{ textDecoration: 'none' }}>
                                                <div className="card">
                                                    <img className="card-img-top" src={repo.owner.avatar_url} alt="avatar not available" />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{repo.name}</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>{console.log(`https://api.github.com/search/repositories?q=topic:ruby&sort=stars&order=desc`)}</div>
                    </div>
                );
                break;
            case 'ERROR':
                el = (
                    <div className="alert alert-info">
                        <h4>Unable to fetch products</h4>
                        <hr />
                        {this.state.error.message}
                    </div>
                );
                break;
            default:
                el = (
                    <div className="alert alert-info">
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
        ReposService.getRepos()
            .then(repos => {
                this.setState({
                    repos: repos,
                    status: 'LOADED'
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                    status: 'ERROR'
                });
            }
            )
    }
}

export default ReposList;