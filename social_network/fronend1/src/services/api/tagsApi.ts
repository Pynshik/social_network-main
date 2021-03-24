import axios from 'axios';
import { TagsStateInterface } from '../../store/ducks/tags/contracts/state';

export const TagsApi = {
    fetchTags(): Promise<TagsStateInterface['items']> {
        return axios.get('http://localhost:8080/tags').then(({data}) => data).catch((error) => console.log(error));
    }
}