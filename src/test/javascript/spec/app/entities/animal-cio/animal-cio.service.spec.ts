import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AnimalCioService } from 'app/entities/animal-cio/animal-cio.service';
import { IAnimalCio, AnimalCio } from 'app/shared/model/animal-cio.model';

describe('Service Tests', () => {
  describe('AnimalCio Service', () => {
    let injector: TestBed;
    let service: AnimalCioService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnimalCio;
    let expectedResult: IAnimalCio | IAnimalCio[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AnimalCioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AnimalCio(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataDoCio: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AnimalCio', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataDoCio: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataDoCio: currentDate
          },
          returnedFromService
        );
        service
          .create(new AnimalCio())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AnimalCio', () => {
        const returnedFromService = Object.assign(
          {
            dataDoCio: currentDate.format(DATE_FORMAT),
            observacao: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataDoCio: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AnimalCio', () => {
        const returnedFromService = Object.assign(
          {
            dataDoCio: currentDate.format(DATE_FORMAT),
            observacao: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataDoCio: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AnimalCio', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
