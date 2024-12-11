import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransformService } from './transform.service';

describe('TransformService', () => {
  let service: TransformService;
  let httpMock: HttpTestingController;

  const testCases = [
                        {num: 1, txt: 1},
                        {num: 3, txt: "FOOFOO"},
                        {num: 5, txt: "BARBAR"}
                    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransformService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  testCases.forEach(test => {
    it(`getResult should send the number ${test.num} and return the corresponding text ${test.txt}`, (done) => {

        service.getResult(test.num).subscribe(
          (result: string) => {
              expect(result).toBeDefined();
              expect(result == test.txt).toBeTruthy();
              done();
            },
          (error) => { fail(error.message) }
        );

        const testRequest = httpMock.expectOne('http://localhost:8080/api/transform?num='+test.num);
        expect(testRequest.request.method).toBe('GET');
        testRequest.flush(test.txt);
    });

  });

  it(`getResult should get an Error`, (done) => {

      service.getResult(10).subscribe(
        (result: string) => { },
        (error) => { expect(error.message).toContain('400');
                     done();
                    }
      );

      const testRequest = httpMock.expectOne('http://localhost:8080/api/transform?num=10');
      expect(testRequest.request.method).toBe('GET');
      testRequest.flush("" ,{ status: 400, statusText: "Bad Request" });
  });

});
