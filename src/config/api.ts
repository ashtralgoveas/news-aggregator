// src/services/api.js
import axios from 'axios';
import newsImage from '../images/newsImage.jpg';
import moment from 'moment';
const NEWS_API_KEY = import.meta.env.VITE_APP_NEWSAPI_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_APP_GUARDIAN_KEY;
const NYT_API_KEY = import.meta.env.VITE_APP_NYT_KEY;

interface ApiResponse {
  // Define the expected structure of the response data
  articles: any[];
  status: string;
  totalResults: number;
}

interface ApiParams {
  [key: string]: string | number; // Adjust based on your API's expected parameters
}
// Helper function to make API requests
const makeApiRequest = async (
  url: string,
  params: ApiParams
): Promise<ApiResponse | null> => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    return null;
  }
};

// Helper function to normalize article data
const normalizeArticles = (articles) => {
  return articles.map((article) => ({
    title: article.title || article.webTitle || article.headline.main,
    description:
      article.description ||
      article.fields?.trailText ||
      article.lead_paragraph,
    url: article.url || article.webUrl || article.web_url,
    source:
      article?.source?.name || article?.fields?.publication || article?.source,
    publishedAt:
      article.publishedAt || article.webPublicationDate || article.pub_date,
    author:
      article?.author ||
      article?.fields?.byline ||
      'Unknown Author' ||
      article?.byline?.original ||
      'No Author',
    category: article?.category || article?.sectionName || 'General',
    imgSrc: article?.urlToImage || article?.image || newsImage,
  }));
};

// Fetch NewsAPI articles
export const fetchNewsAPIArticles = async (search, filters) => {
  const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20`;
  const newsApiSearchByQuery = `https://newsapi.org/v2/everything?q=${search}`;
  const newsApiSearchByCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${
    filters.category
  }&source=${filters.source || 'all'}`;
  const newsApiSearchByQueryCategory = `https://newsapi.org/v2/top-headlines?country=us&q=${search}&category=${filters.category}`;

  const newsSearchApi =
    search.length > 0 && filters.category?.length > 0
      ? newsApiSearchByQueryCategory
      : filters.category?.length > 0
        ? newsApiSearchByCategory
        : search.length > 0
          ? newsApiSearchByQuery
          : newsApiUrl;

  const params = {
    apiKey: NEWS_API_KEY,
    from:
      filters.startArticleDate &&
      moment(filters.startArticleDate).format('YYYY-MM-DD'),
    to:
      filters.endArticleDate &&
      moment(filters.endArticleDate).format('YYYY-MM-DD'),
  };

  const initialParams = {
    apiKey: NEWS_API_KEY,
  };

  if (newsSearchApi === newsApiSearchByQuery) {
    const data = await makeApiRequest(newsSearchApi, params);
    return data ? normalizeArticles(data.articles, 'NewsAPI') : [];
  } else {
    const data = await makeApiRequest(newsSearchApi, initialParams);
    return data ? normalizeArticles(data.articles, 'NewsAPI') : [];
  }
};

// Fetch The Guardian articles
export const fetchGuardianArticles = async (search, filters) => {
  const guardianNewsApi = `https://content.guardianapis.com/search`;

  const params = {
    q: search,
    section: filters.category,
    source: filters.source,
    'from-date':
      filters.startArticleDate &&
      moment(filters.startArticleDate).format('YYYY-MM-DD'),
    'to-date':
      filters.endArticleDate &&
      moment(filters.endArticleDate).format('YYYY-MM-DD'),
    'page-size': 20,
    'api-key': GUARDIAN_API_KEY,
    'show-fields': 'all',
  };

  const data = await makeApiRequest(guardianNewsApi, params);
  return data ? normalizeArticles(data.response.results, 'The Guardian') : [];
};

// Fetch NewYork News articles
export const fetchNYTimesArticles = async (search, filters) => {
  const newYorkTimesApi = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  const params = {
    q: search,
    fq: filters.category,
    begin_date:
      filters.startArticleDate &&
      moment(filters.startArticleDate).format('YYYY-MM-DD'),
    end_date:
      filters.endArticleDate &&
      moment(filters.endArticleDate).format('YYYY-MM-DD'),
    'api-key': NYT_API_KEY,
    category: filters.category,
    source: filters.source,
  };

  const data = await makeApiRequest(newYorkTimesApi, params);
  return data
    ? normalizeArticles(data.response.docs, 'The New York Times')
    : [];
};
