import {TestBed} from '@angular/core/testing';

import {ArticleService} from './article.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Article} from "./article";

describe('ArticleService', () => {
  let httpMock: HttpTestingController;
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ArticleService);
  });

  it('should save an article', (done) => {
    let article = {
      sku: 'some SKU',
      name: 'some name',
      description: 'some description',
      priceInUsd: 42
    } as Article;

    service.save(article).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`/api/article/`);
    expect(req.request.method).toBe("POST");
    req.flush({
      "sku": article.sku,
      "name": article.name,
      "description": article.description,
      "priceInUsd": article.priceInUsd,
      "_links": {
        "self": {
          "href": "http://localhost:8080/api/article/1"
        },
        "article": {
          "href": "http://localhost:8080/api/article/1"
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/hal+json'
      },
      status: 201,
      statusText: 'Created'
    });
  });
});
