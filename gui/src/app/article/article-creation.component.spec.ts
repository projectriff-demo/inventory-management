import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleCreationComponent} from './article-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArticleService} from './article.service';
import {Article} from './article';
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('ArticleCreationComponent', () => {
  let component: ArticleCreationComponent;
  let fixture: ComponentFixture<ArticleCreationComponent>;
  let dom;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    articleServiceSpy = jasmine.createSpyObj<ArticleService>(['save']);
    articleServiceSpy.save.and.returnValue(of({}));
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ArticleCreationComponent],
      providers: [
        {provide: ArticleService, useValue: articleServiceSpy},
        {provide: Router, useValue: routerStub}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreationComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form', () => {
    expect(dom.querySelector('form')).toBeTruthy('form should render');
  });

  describe('when saving an article', () => {
    let form;

    const expectedArticle = {
      sku: 'some SKU',
      name: 'some name',
      description: 'some description',
      priceInUsd: 42
    } as Article;

    beforeEach(() => {
      form = dom.querySelector('form');
    });

    it('should call the article service on submit', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).toHaveBeenCalledWith(expectedArticle);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/list'], {replaceUrl: true});
    });

    it('should reject an empty SKU', () => {
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#sku').classList)).toContain('ng-invalid');
    });

    it('should reject an empty name', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#name').classList)).toContain('ng-invalid');
    });

    it('should reject an empty description', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#description').classList)).toContain('ng-invalid');
    });

    it('should reject an empty price', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#priceInUsd').classList)).toContain('ng-invalid');
    });
  });

  const setValue = (element, value) => {
    element.value = value;
    element.dispatchEvent(new Event('input'));
  };
});
