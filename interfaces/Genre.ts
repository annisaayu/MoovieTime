export interface Genre {
  id: number;
  name: string;
}
export interface IGenreAPIResponseList {
  genres: Genre[];
}

export interface IAPIResponseError {
  success: boolean;
	status_code: number;
	status_message: string;
}
