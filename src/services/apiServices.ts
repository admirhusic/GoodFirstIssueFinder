import axios from 'axios';
import {GitHubAPIResponse} from "../types";


const BASE_URL = 'https://api.github.com/search';

const api = axios.create({
    baseURL: BASE_URL,
});


const apiService = {

    searchIssues: async (): Promise<GitHubAPIResponse> => {
        try {
            const response = await api.get('/issues', {
                params: {
                    q: 'label:"good first issue" language:javascript state:open',
                    sort: 'created',
                    order: 'desc',
                    page: 1,
                    per_page: 10
                },
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            });
            return response.data
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },


};

export default apiService;
