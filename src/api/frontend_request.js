import {json} from '@/api/config';

export default {
    getDataHome() {
        return json.get('home');
    },
    getDataDetail() {
        return json.get('detail');
    }
}
