import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleListComponent} from './article-list.component';
import {ArticleService} from "./article.service";
import {ReplaySubject} from "rxjs";
import {Article} from "./article";
import {RouterTestingModule} from "@angular/router/testing";

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let dom;
  const expectedArticle1 = {
    sku: 'SKU1',
    name: 'name1',
    description: 'description1',
    priceInUsd: 1
  } as Article;
  const expectedArticle2 = {
    sku: 'SKU2',
    name: 'name2',
    description: 'description2',
    priceInUsd: 2
  } as Article;
  let articleServiceStub;

  beforeEach(async(() => {
    articleServiceStub = new ArticleServiceStub([expectedArticle1, expectedArticle2]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ArticleListComponent],
      providers: [
        {provide: ArticleService, useValue: articleServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should list the saved articles', () => {
    expect(Array.from(dom.querySelectorAll('.card text'))
      .map((title: any) => title.textContent))
      .toEqual([expectedArticle1.name, expectedArticle2.name]);
  });

  it('should allow article deletions', () => {
    const deleteLink = dom.querySelector('.card span.delete-link');

    deleteLink.click();
    fixture.detectChanges();

    expect(Array.from(dom.querySelectorAll('.card text'))
      .map((title: any) => title.textContent))
      .not.toContain(expectedArticle1.name);
  });
});

class ArticleServiceStub {

  private subject = new ReplaySubject<Article[]>(1);
  articles$ = this.subject.asObservable();

  constructor(private data: Article[]) {
  }

  findAll(): void {
    this.subject.next(this.data);
  }

  deleteBySku(sku: string): void {
    expect(this.data.map(a => a.sku)).toContain(sku);
    this.subject.next(this.data.filter(a => a.sku !== sku));
  }
}
