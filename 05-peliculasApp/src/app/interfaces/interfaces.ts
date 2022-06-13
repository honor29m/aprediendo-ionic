export interface RespuestaMDB {
    page:          number;
    results:       Pelicula[];
    total_pages:   number;
    total_results: number;
}

export interface Pelicula {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum OriginalLanguage {
    De = "de",
    En = "en",
    Es = "es",
}
