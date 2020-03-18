import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleCreationComponent} from './article-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArticleService} from './article.service';
import {Article} from './article';
import {of} from 'rxjs';
import {Router} from '@angular/router';

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
      priceInUsd: 42,
      imageUrl: 'https://giphygifs.s3.amazonaws.com/media/kKdgdeuO2M08M/giphy.gif',
      quantity: 3
    } as Article;

    beforeEach(() => {
      form = dom.querySelector('form');
    });

    it('should call the article service on submit', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#imageUrl'), expectedArticle.imageUrl);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).toHaveBeenCalledWith(expectedArticle);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/list'], {replaceUrl: true});
    });

    it('should accept an empty image URL', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).toHaveBeenCalled();
    });

    it('should reject an empty SKU', () => {
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#sku').classList)).toContain('ng-invalid');
    });

    it('should reject a blank SKU', () => {
      setValue(form.querySelector('#sku'), '    ');
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#sku').classList)).toContain('ng-invalid');
    });

    it('should reject an empty name', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#name').classList)).toContain('ng-invalid');
    });

    it('should reject a blank name', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), ' ');
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#name').classList)).toContain('ng-invalid');
    });

    it('should reject an empty description', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#description').classList)).toContain('ng-invalid');
    });

    it('should reject a blank description', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), ' ');
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#description').classList)).toContain('ng-invalid');
    });

    it('should reject an empty price', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#priceInUsd').classList)).toContain('ng-invalid');
    });

    it('should reject a negative price (inc. 0)', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);
      setValue(form.querySelector('#priceInUsd'), 0);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#priceInUsd').classList)).toContain('ng-invalid');
    });

    it('should reject a too small price', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#quantity'), expectedArticle.quantity);
      setValue(form.querySelector('#priceInUsd'), 0.001);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#priceInUsd').classList)).toContain('ng-invalid');
    });

    it('should reject an empty quantity', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#quantity').classList)).toContain('ng-invalid');
    });

    it('should reject a negative quantity', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), -1);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#quantity').classList)).toContain('ng-invalid');
    });

    it('should reject positive non-integer quantity values', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), 3.4);

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#quantity').classList)).toContain('ng-invalid');
    });

    it('should reject values too big to be stored by the backend', () => {
      setValue(form.querySelector('#sku'), expectedArticle.sku);
      setValue(form.querySelector('#name'), expectedArticle.name);
      setValue(form.querySelector('#description'), expectedArticle.description);
      setValue(form.querySelector('#priceInUsd'), expectedArticle.priceInUsd);
      setValue(form.querySelector('#quantity'), Math.pow(2, 31));

      form.querySelector('.button').click();

      expect(articleServiceSpy.save).not.toHaveBeenCalled();
      expect(Array.from(form.querySelector('#quantity').classList)).toContain('ng-invalid');
    });
  });

  const setValue = (element, value) => {
    element.value = value;
    element.dispatchEvent(new Event('input'));
  };
});
