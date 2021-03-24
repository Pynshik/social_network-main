import { axios } from '../../core/axios';
import { TweetInterface } from '../../store/ducks/tweets/contracts/state';

interface Response<T> {
    status: string;
    data: T;
}

export const TweetsApi = {
    async fetchTweets(userId?: string): Promise<TweetInterface[]> {
        try {
            const {data} = await axios.get<Response<TweetInterface[]>>(userId ? `http://localhost:8080/tweets/user/${userId}` : 'http://localhost:8080/tweets/');
            return data.data;   
        } catch (error) {
            console.log('error in tweetsApi');
            return [];
        }
    },
    //@ts-ignore
    async fetchTweetData(id: string): Promise<TweetInterface> {
        try {
            const {data} = await axios.get<Response<TweetInterface>>('http://localhost:8080/tweets/' + id);
            return data.data;   
        } catch (error) {
            console.log('error in tweetsApi');
        }
    },
    //@ts-ignore
    async addTweet(payload: { text: string, images: string[] }): Promise<TweetInterface> {
        try {
            const {data} = await axios.post<Response<TweetInterface>>('http://localhost:8080/tweets', payload);
            return data.data;
        } catch (error) {
            console.log('error in tweetsApi')
        }
    },
    async searchTweets(payload: string ): Promise<TweetInterface[]> {
        try {
            const {data} = await axios.get<Response<TweetInterface[]>>('http://localhost:8080/tweets/search?q=' + payload);
            return data.data;
        } catch (error) {
            console.log('error in tweetsApi');
            return [];
        }
    },
    removeTweet: (id: string): Promise<void> => axios.delete('http://localhost:8080/tweets/' + id),
}
