export type SORT_BY_TYPE = "mostLiked" | "mostViewed" | "latest" | "oldest";

export type GET_VIDEOS = {
  signal?: AbortSignal;
  page: number;
  limit: number;
  query: string;
  sortBy: SORT_BY_TYPE;
};

export type DISPLAY_CONFIG = {
  page: number;
  limit: number;
  query: string;
  sortBy: SORT_BY_TYPE;
  totalPages: number;
  nextPage: boolean;
  previousPage: boolean;
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

export type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
};

export type Statistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type VideoItem = {
  kind: "youtube#video";
  id: string;
  snippet: Snippet;
  statistics: Statistics;
};

export type VideoResponse = {
  kind: "youtube#videoListResponse";
  items: VideoItem;
};
