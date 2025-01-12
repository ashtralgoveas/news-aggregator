export interface ApiResponse {
  articles: string[];
  status: string;
  totalResults: number;
}

export interface ApiParams {
  [key: string]: string | number;
}
