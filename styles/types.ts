export interface Movie {
  poster_path: string;
  title: string;
}

export interface ApiResponse {
  results: Movie[];
  total_results: number;
}
