import {Injectable} from '@angular/core';
import {Article} from './article';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  public save(article: Article): Observable<any> {
    return this.http.post<Article>('/api/article/', article);
  }
}
