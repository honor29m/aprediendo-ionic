import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticlesByCategoryAndPage, NewsResponse } from '../interfaces';
import { map } from 'rxjs/operators'

import { storedArticlesByCategory } from '../data/mock-news';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory;
  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Peticion HTTP realizada');
    return this.http.get<T>( `${ this.apiURL }${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us'
      }
    });
  }

  getTopHeadLines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
    
    // return this.executeQuery<NewsResponse>(`top-headlines?country=us&category=business`).pipe(
    //   map( ({articles}) => articles )
    // );
  }

  getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]> {
    
    return of(this.articlesByCategoryAndPage[category].articles);


    if ( loadMore ) {
      return this.getArticlesByCategory( category ); 
    }
    
    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles); //of convierte en un Observable lo que sea que se coloque en el argumento
    }

    return this.getArticlesByCategory( category );
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

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map( ({articles}) => {
        
        if ( articles.length === 0 ) return [];

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles]
        }

        return this.articlesByCategoryAndPage[category].articles; 
      })
    );
  }
}