import {Component, OnInit} from '@angular/core';
import {ArticleService} from "./article.service";
import {Observable} from "rxjs";
import {Article} from "./article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articles$ = this.articleService.findAll();
  }

}
