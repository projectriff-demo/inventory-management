import {Injectable} from '@angular/core';
import {Item} from './item';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  public save(item: Item): Observable<any> {
    return this.http.post<Item>('/api/article/', item);
  }
}
