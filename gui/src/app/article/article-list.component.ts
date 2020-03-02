import {Component, OnInit} from '@angular/core';
import {ArticleService} from './article.service';
import {Observable, Subscription} from 'rxjs';
import {Article} from './article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;

  private subscription: Subscription = null;

  constructor(private articleService: ArticleService) {
    console.dir(articleService);
  }

  ngOnInit() {
    this.articles$ = this.articleService.articles$;
    this.articleService.findAll();
  }

  delete(sku: string) {
    this.articleService.deleteBySku(sku);
  }
}
