import {TestBed} from '@angular/core/testing';

import {ArticleService} from './article.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Article} from "./article";

describe('ArticleService', () => {
  let httpMock: HttpTestingController;
  let service: ArticleService;
  const article1 = {
    sku: 'SKU1',
    name: 'name1',
    description: 'description1',
    priceInUsd: 1
  } as Article;
  const article2 = {
    sku: 'SKU2',
    name: 'name2',
    description: 'description2',
    priceInUsd: 2
  } as Article;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ArticleService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save an article', (done) => {
    service.save(article1).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`/api/article/`);
    expect(req.request.method).toBe("POST");
    req.flush({
      "sku": article1.sku,
      "name": article1.name,
      "description": article1.description,
      "priceInUsd": article1.priceInUsd,
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

  it('should list available articles', (done) => {
    service.findAll().subscribe((articles) => {
      expect(articles).toEqual([article1, article2]);
      done();
    });

    const req = httpMock.expectOne(`/api/article/`);
    expect(req.request.method).toBe("GET");
    req.flush({
      "_embedded": {
        "articles": [{
          "sku": article1.sku,
          "name": article1.name,
          "description": article1.description,
          "priceInUsd": article1.priceInUsd,
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/article/1"
            },
            "article": {
              "href": "http://localhost:8080/api/article/1"
            }
          }
        }, {
          "sku": article2.sku,
          "name": article2.name,
          "description": article2.description,
          "priceInUsd": article2.priceInUsd,
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/article/2"
            },
            "article": {
              "href": "http://localhost:8080/api/article/2"
            }
          }
        }]
      },
      "_links": {
        "self": {
          "href": "http://localhost:8080/api/article"
        },
        "profile": {
          "href": "http://localhost:8080/api/profile/article"
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/hal+json'
      }
    });
  });
});
