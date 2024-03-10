import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = Cookies.get('token');

// You can also configure other Axios defaults here if needed

export default axios;
