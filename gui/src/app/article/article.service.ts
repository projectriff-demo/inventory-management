import {Injectable} from '@angular/core';
import {Article} from './article';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles: Article[] = [];

  private articleSubject: ReplaySubject<Article[]> = new ReplaySubject<Article[]>(1);

  public articles$: Observable<Article[]> = this.articleSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public save(article: Article): Observable<any> {
    return this.http.post<Article>('/api/article/', article);
  }

  public findAll(): void {
    this.http.get('/api/article/')
      .pipe(
        filter((_) => _ != null),
        map((data: any) => {
          return data._embedded.articles.map(article => {
            const result = {
              sku: article.sku,
              name: article.name,
              description: article.description,
              priceInUsd: article.priceInUsd,
            } as Article;
            if (article.imageUrl) {
              result.imageUrl = article.imageUrl;
            }
            return result;
          });
        })
      )
      .subscribe((articles: Article[]) => {
        this.publish(articles);
      });
  }

  public deleteBySku(sku: string): void {
    this.http.delete('/api/article', {
      params: new HttpParams().set('sku', sku)
    }).subscribe(_ => {
      this.publish(this.articles.filter(article => article.sku !== sku));
    });
  }

  private publish(articles: Article[]) {
    this.articles = articles;
    this.articleSubject.next(articles);
  }
}
