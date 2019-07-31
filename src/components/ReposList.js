import React from 'react';
import ReposService from '../services/ReposService'
import axios from 'axios';
import '../styles/ReposList.css'

class ReposList extends React.Component {
    state = {
        status: 'LOADING',
        repos: []
    }
    changePage = (type) => {
        this.setState({
            status: 'LOADING'
        });
        if (type === 'all') {
            const javascriptPromise = axios.get(`https://api.github.com/search/repositories?q=topic:javascript&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
            const rubyPromise = axios.get(`https://api.github.com/search/repositories?q=topic:ruby&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
            const javaPromise = axios.get(`https://api.github.com/search/repositories?q=topic:java&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
            const cssPromise = axios.get(`https://api.github.com/search/repositories?q=topic:css&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
            const pythonPromise = axios.get(`https://api.github.com/search/repositories?q=topic:python&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)

            const a = []
            Promise.all([javascriptPromise, rubyPromise, javaPromise, cssPromise, pythonPromise]).then((values) => {
                for (var i = 0; i < values.length; i++) {
                    for (var j = 0; j < values[i].length; j++) {
                        a.push(values[i][j])
                    }
                }
                a.sort(function (x, y) {
                    return y.stargazers_count - x.stargazers_count
                })
                console.log(a)
                //setState should be inside this Promiseall function only. It is because,
                //if it is written outside, then we'll get an empty array since the Promiseall 
                //is an asynchronous function
                this.setState({
                    repos: a,
                    status: 'LOADED'
                })
            });
        }
        else {
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
                        <div className="alert alert-info">
                            <div className="row">
                                {
                                    this.state.repos.map((repo, index) => (
                                        <div className="col-3 my-3" key={repo.id}>
                                            <a href={`${repo.html_url}`} style={{ textDecoration: 'none' }}>
                                                <div className="card">
                                                    <img className="card-img-top" src={repo.owner.avatar_url} alt="avatar not available" />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{repo.name}</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <h4 className="card-title">{repo.stargazers_count}</h4>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
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
            <div className="container center">
                <div className="pagination1">
                    <a data-page="All" onClick={() => this.changePage('all')}>All</a>
                    <a data-page="JavaScript" onClick={() => this.changePage('javascript')}>JavaScript</a>
                    <a data-page="Ruby" onClick={() => this.changePage('ruby')}>Ruby</a>
                    <a data-page="Java" onClick={() => this.changePage('java')}>Java</a>
                    <a data-page="CSS" onClick={() => this.changePage('css')}>CSS</a>
                    <a data-page="Python" onClick={() => this.changePage('python')}>Python</a>
                </div>
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