import React from 'react';
import ReposService from '../services/ReposService'
import axios from 'axios';
import '../styles/ReposList.css'

class ReposList extends React.Component {
    state = {
        repos: [],
        error:{}
    }
    changePage = (type) => {
        this.props.loading();
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
                })
                this.props.loaded();
            });
        }
        else {
            axios.get(`https://api.github.com/search/repositories?q=topic:${type}&sort=stars&order=desc`)
                .then(response => response.data)
                .then(data => data.items)
                .then(repos => {
                    this.setState({
                        repos: repos,
                    })
                    this.props.loaded();
                })
                .catch(error => {
                    this.setState({
                        error: error,
                    });
                    this.props.error();
                })
        }
    }
    render() {
        let el;
        switch (this.props.status) {
            case 'LOADING':
                el = (
                    <div className="alert alert-info">
                        Repos are being fetched.
                    </div>
                );
                break;
            case 'LOADED':
                el = (
                    <div clasName="my-4">
                        <div className="row">
                            {
                                this.state.repos.map((repo, index) => (
                                    <div class="col-3">
                                        <div className="card my-3 p-3 bg-color">
                                            <p className="my-4 index">#{index+1}</p>
                                            <img className="card-img-top round" src={repo.owner.avatar_url} alt="avatar not available" width="150px" height="200px" />
                                            <div className="card-body">
                                                <a className="td repo-name" href={`${repo.html_url}`} target="_blank"  title="Go to repository" style={{ color: '#B21414', fontWeight:'bold', fontSize: '25px' }}>{repo.name}</a>
                                                <div className="row" style={{ padding:'10px' }}>
                                                    <img alt="" width="25px" src="https://ardentcollaborations.com/Central/assets/images_22/public.png" />&nbsp;&nbsp;&nbsp;
                                                    <a className="td text" href={`${repo.owner.html_url}`} target="_blank" title="Go to profile">{repo.name}</a>
                                                </div>
                                                <div className="row" style={{ padding:'10px' }}>
                                                    <img alt="" width="25px" src="https://cdn.freebiesupply.com/logos/large/2x/silver-star-logo-png-transparent.png" />&nbsp;&nbsp;&nbsp;
                                                    <span className="text">{repo.stargazers_count} stars</span>
                                                </div>
                                                <div className="row" style={{ padding:'10px' }}>
                                                    <img alt="" width="25px" src="https://cdn0.iconfinder.com/data/icons/hippicons-technology/64/code-fork-512.png" />&nbsp;&nbsp;&nbsp;
                                                    <span className="text">{repo.forks} forks</span>
                                                </div>
                                                <div className="row" style={{ padding:'10px' }}>
                                                    <img alt="" width="25px" src="https://www.pngrepo.com/download/121755/warning-symbol.png" />&nbsp;&nbsp;&nbsp;
                                                    <span className="text">{repo.open_issues_count} open issues</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div >
                    </div >
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
                <div className="pagination1 my-5">
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
                })
                this.props.loaded();
            })
            .catch(error => {
                this.setState({
                    error: error,
                });
                this.props.errorS();
            })
    }
}

export default ReposList;