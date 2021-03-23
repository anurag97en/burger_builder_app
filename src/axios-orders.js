
import axios from 'axios'

const instance= axios.create({
    baseURL : "https://react-my-burger-73f61-default-rtdb.firebaseio.com/"
});

export default instance


