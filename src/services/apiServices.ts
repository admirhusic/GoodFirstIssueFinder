import axios from "axios";
import { GitHubIssue } from "../types";

const BASE_URL = "https://api.github.com/search";

const api = axios.create({
  baseURL: BASE_URL,
});

const apiService = {
  searchIssues: async (): Promise<{
    total_count: number;
    incomplete_results: boolean;
    error: string;
    items: GitHubIssue[] | null;
  }> => {
    const labelQueryParam = 'label:"good first issue" ';
    const lanugageQueryParam = "language:javascript ";
    const stateQueryParam = "state:open ";

    try {
      const response = await api.get("/issues", {
        params: {
          q: `${labelQueryParam}${lanugageQueryParam}${stateQueryParam}`,
          sort: "created",
          order: "desc",
          page: 1,
          per_page: 25,
        },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response);
        if (error.response.status === 403) {
          console.error("Access denied: 403 Forbidden");
          return {
            incomplete_results: false,
            items: null,
            total_count: 0,
            error: "Access denied. Please check your permissions.",
          };
        } else {
          return {
            incomplete_results: false,
            items: null,
            total_count: 0,
            error: `Error: ${error.response.status} ${error.response.statusText}`,
          };
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        return {
          incomplete_results: false,
          items: null,
          total_count: 0,
          error: "No response from server. Please try again later.",
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        return {
          incomplete_results: false,
          items: null,
          total_count: 0,
          error: "An unexpected error occurred. Please try again.",
        };
      }
    }
  },
};

export default apiService;
