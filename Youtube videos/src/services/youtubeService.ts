import type { GET_VIDEOS } from "../types/type";
import api from "./api";

const youtubeService = {
  async getVideos({ signal, sortBy, limit, query, page }: GET_VIDEOS) {
    const { data } = await api.get(
      `?limit=${limit}&query=${query}&page=${page}&sortBy=${sortBy}`,
      { signal },
    );

    return data;
  },
};

export default youtubeService;
