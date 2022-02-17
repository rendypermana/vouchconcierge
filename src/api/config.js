import axios from 'axios'

const domain = 'https://mock.vouchconcierge.com/ios/catalogue/'
const baseURL = `${domain}`;

export const json = axios.create({
    baseURL,
    headers:{
        'Content-type': 'application/json'
    }
});