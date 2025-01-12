export interface ApiResponse {
  response: any;
  articles: string[];
  status: string;
  totalResults: number;
}

export interface ApiParams {
  [key: string]: string | number;
}

export interface Filters {
  query: string;
  category: string;
  startArticleDate: string;
  endArticleDate: string;
  source: string;
  author: string;
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string;
  category: string;
  date: string;
}

export interface ArticlesState {
  articles: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: Filters;
}

export interface Options {
  name: string;
  key: string;
}
