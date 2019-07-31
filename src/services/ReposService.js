
import axios from 'axios';

const ReposService = {
    getRepos(){
        return axios.get('https://api.github.com/search/repositories?q=topic:javascript&sort=stars&order=desc')
        .then(response => response.data)
        .then(data => data.items)    
    }
}
 
export default ReposService;