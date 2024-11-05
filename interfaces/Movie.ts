import type { Genre } from "./Genre";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | BelongToCollection;
  budget: number;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  media_type: "movie";
  original_title: string;
  overview: string;
  original_language: string;
  poster_path: string;
  popularity: number;
  production_companies:  ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  release_date: string;
  revenue:  number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface BelongToCollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface IMovieAPIResponseList {
  page: number;
  results: Movie[];
  total_page: number;
  total_results:  number;
}

export interface IAPIResponseError {
  success: boolean;
	status_code: number;
	status_message: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface IMovieDetailAPIResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}