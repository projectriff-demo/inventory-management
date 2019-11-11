import {Injectable} from '@angular/core';
import {Article} from './article';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  public save(article: Article): Observable<any> {
    return this.http.post<Article>('/api/article/', article);
  }

  public findAll(): Observable<Article[]> {
    return this.http.get('/api/article/')
      .pipe(
        filter((_) => _ != null),
        map((data: any) => {
          return data._embedded.articles.map(article => {
            return {
              sku: article.sku,
              name: article.name,
              description: article.description,
              priceInUsd: article.priceInUsd,
            } as Article;
          });
        })
      );
  }
}
