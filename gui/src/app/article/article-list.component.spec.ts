import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleListComponent} from './article-list.component';
import {ArticleService} from "./article.service";
import {of} from "rxjs";
import {Article} from "./article";

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let dom;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
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

  beforeEach(async(() => {
    articleServiceSpy = jasmine.createSpyObj<ArticleService>(['findAll']);
    articleServiceSpy.findAll.and.returnValue(of([expectedArticle1, expectedArticle2]));
    TestBed.configureTestingModule({
      declarations: [ArticleListComponent],
      providers: [{provide: ArticleService, useValue: articleServiceSpy}]
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
});
