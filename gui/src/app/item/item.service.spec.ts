import {TestBed} from '@angular/core/testing';

import {ItemService} from './item.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Item} from "./item";

describe('ItemService', () => {
  let httpMock: HttpTestingController;
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ItemService);
  });

  it('should save an item', (done) => {
    let item = {
      sku: 'some SKU',
      name: 'some name',
      description: 'some description',
      priceInUsd: 42
    } as Item;

    service.save(item).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`/api/article/`);
    expect(req.request.method).toBe("POST");
    req.flush({
      "sku": item.sku,
      "name": item.name,
      "description": item.description,
      "priceInUsd": item.priceInUsd,
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
