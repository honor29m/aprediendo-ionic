import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {}

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadLines(): Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        apiKey: apiKey
      }
    }).pipe(
      map( ({articles}) => articles )
    );
  }

  getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`, {
      params: {
        apiKey: apiKey
      }
    }).pipe(
      map( ({articles}) => articles )
    );
  }

  private getArticlesByCategory( category:string ): Observable<Article[]> {
    if ( Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      // this.articlesByCategoryAndPage[category].page += 1;
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.http.get<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map( ({articles}) => articles )
    );
  }
}